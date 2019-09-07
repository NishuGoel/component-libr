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
var fs_1 = __importDefault(require("fs"));
var core_1 = require("@angular-devkit/core");
var webpack_configs_1 = require("@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs");
function isDirectory(assetPath) {
    try {
        return fs_1.default.statSync(assetPath).isDirectory();
    }
    catch (e) {
        return false;
    }
}
function getAssetsParts(resolvedAssetPath, assetPath) {
    if (isDirectory(resolvedAssetPath)) {
        return {
            glob: '**/*',
            input: assetPath,
        };
    }
    return {
        glob: core_1.basename(assetPath),
        input: core_1.dirname(assetPath),
    };
}
function isStylingRule(rule) {
    var test = rule.test;
    if (!test) {
        return false;
    }
    if (!(test instanceof RegExp)) {
        return false;
    }
    return test.test('.css') || test.test('.scss') || test.test('.sass');
}
function filterOutStylingRules(config) {
    return config.module.rules.filter(function (rule) { return !isStylingRule(rule); });
}
exports.filterOutStylingRules = filterOutStylingRules;
function isBuildAngularInstalled() {
    try {
        require.resolve('@angular-devkit/build-angular');
        return true;
    }
    catch (e) {
        return false;
    }
}
exports.isBuildAngularInstalled = isBuildAngularInstalled;
// todo add type
function getAngularCliParts(cliWebpackConfigOptions) {
    try {
        return {
            cliCommonConfig: webpack_configs_1.getCommonConfig(cliWebpackConfigOptions),
            cliStyleConfig: webpack_configs_1.getStylesConfig(cliWebpackConfigOptions),
        };
    }
    catch (e) {
        return null;
    }
}
exports.getAngularCliParts = getAngularCliParts;
// todo fix any
function normalizeAssetPatterns(assetPatterns, dirToSearch, sourceRoot) {
    if (!assetPatterns || !assetPatterns.length) {
        return [];
    }
    // todo fix any
    return assetPatterns.map(function (assetPattern) {
        if (typeof assetPattern === 'object') {
            return assetPattern;
        }
        var assetPath = core_1.normalize(assetPattern);
        var resolvedSourceRoot = core_1.resolve(dirToSearch, sourceRoot);
        var resolvedAssetPath = core_1.resolve(dirToSearch, assetPath);
        var parts = getAssetsParts(resolvedAssetPath, assetPath);
        // Output directory for both is the relative path from source root to input.
        var output = core_1.relative(resolvedSourceRoot, core_1.resolve(dirToSearch, parts.input));
        // Return the asset pattern in object format.
        return __assign({}, parts, { output: output });
    });
}
exports.normalizeAssetPatterns = normalizeAssetPatterns;
