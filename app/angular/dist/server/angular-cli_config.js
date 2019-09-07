"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var node_logger_1 = require("@storybook/node-logger");
var tsconfig_paths_webpack_plugin_1 = require("tsconfig-paths-webpack-plugin");
var angular_cli_utils_1 = require("./angular-cli_utils");
function getTsConfigOptions(tsConfigPath) {
    var basicOptions = {
        options: {},
        raw: {},
        fileNames: [],
        errors: [],
    };
    if (!fs_1.default.existsSync(tsConfigPath)) {
        return basicOptions;
    }
    var tsConfig = JSON.parse(fs_1.default.readFileSync(tsConfigPath, 'utf8'));
    var baseUrl = tsConfig.compilerOptions.baseUrl;
    if (baseUrl) {
        var tsConfigDirName = path_1.default.dirname(tsConfigPath);
        basicOptions.options.baseUrl = path_1.default.resolve(tsConfigDirName, baseUrl);
    }
    return basicOptions;
}
function getAngularCliWebpackConfigOptions(dirToSearch) {
    var fname = path_1.default.join(dirToSearch, 'angular.json');
    if (!fs_1.default.existsSync(fname)) {
        return null;
    }
    var angularJson = JSON.parse(fs_1.default.readFileSync(fname, 'utf8'));
    var projects = angularJson.projects, defaultProject = angularJson.defaultProject;
    if (!projects || !Object.keys(projects).length) {
        throw new Error('angular.json must have projects entry.');
    }
    var fallbackProject = defaultProject && projects[defaultProject];
    var firstProject = projects[Object.keys(projects)[0]];
    var project = projects.storybook || fallbackProject || firstProject;
    var projectOptions = project.architect.build.options;
    var normalizedAssets = angular_cli_utils_1.normalizeAssetPatterns(projectOptions.assets, dirToSearch, project.sourceRoot);
    var projectRoot = path_1.default.resolve(dirToSearch, project.root);
    var tsConfigPath = path_1.default.resolve(dirToSearch, projectOptions.tsConfig);
    var tsConfig = getTsConfigOptions(tsConfigPath);
    return {
        root: dirToSearch,
        projectRoot: projectRoot,
        tsConfigPath: tsConfigPath,
        tsConfig: tsConfig,
        supportES2015: false,
        buildOptions: __assign({ sourceMap: false, optimization: {} }, projectOptions, { assets: normalizedAssets }),
    };
}
exports.getAngularCliWebpackConfigOptions = getAngularCliWebpackConfigOptions;
// todo add types
function applyAngularCliWebpackConfig(baseConfig, cliWebpackConfigOptions) {
    if (!cliWebpackConfigOptions) {
        return baseConfig;
    }
    if (!angular_cli_utils_1.isBuildAngularInstalled()) {
        node_logger_1.logger.info('=> Using base config because @angular-devkit/build-angular is not installed.');
        return baseConfig;
    }
    var cliParts = angular_cli_utils_1.getAngularCliParts(cliWebpackConfigOptions);
    if (!cliParts) {
        node_logger_1.logger.warn('=> Failed to get angular-cli webpack config.');
        return baseConfig;
    }
    node_logger_1.logger.info('=> Get angular-cli webpack config.');
    var cliCommonConfig = cliParts.cliCommonConfig, cliStyleConfig = cliParts.cliStyleConfig;
    // Don't use storybooks styling rules because we have to use rules created by @angular-devkit/build-angular
    // because @angular-devkit/build-angular created rules have include/exclude for global style files.
    var rulesExcludingStyles = angular_cli_utils_1.filterOutStylingRules(baseConfig);
    // cliStyleConfig.entry adds global style files to the webpack context
    // todo add type for acc
    var entry = baseConfig.entry.concat(Object.values(cliStyleConfig.entry).reduce(function (acc, item) { return acc.concat(item); }, []));
    var module = __assign({}, baseConfig.module, { rules: cliStyleConfig.module.rules.concat(rulesExcludingStyles) });
    // We use cliCommonConfig plugins to serve static assets files.
    var plugins = cliStyleConfig.plugins.concat(cliCommonConfig.plugins, baseConfig.plugins);
    var resolve = __assign({}, baseConfig.resolve, { modules: Array.from(new Set(baseConfig.resolve.modules.concat(cliCommonConfig.resolve.modules))), plugins: [
            new tsconfig_paths_webpack_plugin_1.TsconfigPathsPlugin({
                configFile: cliWebpackConfigOptions.buildOptions.tsConfig,
                // After ng build my-lib the default value of 'main' in the package.json is 'umd'
                // This causes that you cannot import components directly from dist
                // https://github.com/angular/angular-cli/blob/9f114aee1e009c3580784dd3bb7299bdf4a5918c/packages/angular_devkit/build_angular/src/angular-cli-files/models/webpack-configs/browser.ts#L68
                mainFields: (cliWebpackConfigOptions.supportES2015 ? ['es2015'] : []).concat([
                    'browser',
                    'module',
                    'main',
                ]),
            }),
        ] });
    return __assign({}, baseConfig, { entry: entry,
        module: module,
        plugins: plugins,
        resolve: resolve, resolveLoader: cliCommonConfig.resolveLoader });
}
exports.applyAngularCliWebpackConfig = applyAngularCliWebpackConfig;
