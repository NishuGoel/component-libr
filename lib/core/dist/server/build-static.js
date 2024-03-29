"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildStaticStandalone = buildStaticStandalone;
exports.buildStatic = buildStatic;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireDefault(require("webpack"));

var _shelljs = _interopRequireDefault(require("shelljs"));

var _nodeLogger = require("@storybook/node-logger");

var _cli = require("./cli");

var _config = _interopRequireDefault(require("./config"));

var _managerConfig = _interopRequireDefault(require("./manager/manager-config"));

var _logConfig = require("./logConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function compileManager(managerConfig, managerStartTime) {
  _nodeLogger.logger.info('=> Compiling manager..');

  return new Promise((resolve, reject) => {
    (0, _webpack.default)(managerConfig).run((error, stats) => {
      if (error || !stats || stats.hasErrors()) {
        _nodeLogger.logger.error('=> Failed to build the manager');

        if (error) {
          _nodeLogger.logger.error(error.message);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          const {
            warnings,
            errors
          } = stats.toJson(managerConfig.stats);
          errors.forEach(e => _nodeLogger.logger.error(e));
          warnings.forEach(e => _nodeLogger.logger.error(e));
        }

        process.exitCode = 1;
        reject(error || stats);
        return;
      }

      _nodeLogger.logger.trace({
        message: '=> manager built',
        time: process.hrtime(managerStartTime)
      });

      stats.toJson(managerConfig.stats).warnings.forEach(e => _nodeLogger.logger.warn(e));
      resolve(stats);
    });
  });
}

async function watchPreview(previewConfig) {
  _nodeLogger.logger.info('=> Compiling preview in watch mode..');

  return new Promise(() => {
    (0, _webpack.default)(previewConfig).watch({
      aggregateTimeout: 1
    }, (error, stats) => {
      if (!error) {
        const statsConfig = previewConfig.stats ? previewConfig.stats : {
          colors: true
        }; // eslint-disable-next-line no-console

        console.log(stats.toString(statsConfig));
      } else {
        _nodeLogger.logger.error(error.message);
      }
    });
  });
}

async function compilePreview(previewConfig, previewStartTime) {
  _nodeLogger.logger.info('=> Compiling preview..');

  return new Promise((resolve, reject) => {
    (0, _webpack.default)(previewConfig).run((error, stats) => {
      if (error || !stats || stats.hasErrors()) {
        _nodeLogger.logger.error('=> Failed to build the preview');

        process.exitCode = 1;

        if (error) {
          _nodeLogger.logger.error(error.message);

          return reject(error);
        }

        if (stats && (stats.hasErrors() || stats.hasWarnings())) {
          const {
            warnings,
            errors
          } = stats.toJson(previewConfig.stats);
          errors.forEach(e => _nodeLogger.logger.error(e));
          warnings.forEach(e => _nodeLogger.logger.error(e));
          return reject(stats);
        }
      }

      _nodeLogger.logger.trace({
        message: '=> Preview built',
        time: process.hrtime(previewStartTime)
      });

      stats.toJson(previewConfig.stats).warnings.forEach(e => _nodeLogger.logger.warn(e));
      return resolve(stats);
    });
  });
}

async function copyAllStaticFiles(staticDir, outputDir) {
  if (staticDir && staticDir.length) {
    await Promise.all(staticDir.map(async dir => {
      const staticPath = _path.default.resolve(dir);

      if (await !_fsExtra.default.exists(staticPath)) {
        _nodeLogger.logger.error(`Error: no such directory to load static files: ${staticPath}`);

        process.exit(-1);
      }

      _shelljs.default.cp('-r', `${dir}/!(index.html)`, outputDir);
    }));

    _nodeLogger.logger.info(`=> Copying static files from: ${staticDir.join(', ')}`);
  }
}

async function buildManager(configType, outputDir, configDir, options) {
  _nodeLogger.logger.info('=> Building manager..');

  const managerStartTime = process.hrtime();

  _nodeLogger.logger.info('=> Loading manager config..');

  const managerConfig = await (0, _managerConfig.default)({
    configType,
    outputDir,
    configDir,
    corePresets: [require.resolve('./manager/manager-preset.js')],
    frameworkPresets: options.frameworkPresets,
    docsMode: options.docsMode,
    previewUrl: options.previewUrl
  });

  if (options.debugWebpack) {
    (0, _logConfig.logConfig)('Manager webpack config', managerConfig);
  }

  return compileManager(managerConfig, managerStartTime);
}

async function buildPreview(configType, outputDir, packageJson, options) {
  const {
    watch,
    debugWebpack
  } = options;

  _nodeLogger.logger.info('=> Building preview..');

  const previewStartTime = process.hrtime();

  _nodeLogger.logger.info('=> Loading preview config..');

  const previewConfig = await (0, _config.default)(_objectSpread({
    configType,
    outputDir,
    packageJson,
    corePresets: [require.resolve('./preview/preview-preset.js')],
    overridePresets: [require.resolve('./preview/custom-webpack-preset.js')]
  }, options));

  if (debugWebpack) {
    (0, _logConfig.logConfig)('Preview webpack config', previewConfig);
  }

  if (watch) {
    return watchPreview(previewConfig);
  }

  return compilePreview(previewConfig, previewStartTime);
}

function prepareFilesStructure(outputDir, defaultFavIcon) {
  // clear the output dir
  _nodeLogger.logger.info('clean outputDir..');

  _shelljs.default.rm('-rf', outputDir); // create output directory if not exists


  _shelljs.default.mkdir('-p', outputDir);

  _shelljs.default.mkdir('-p', _path.default.join(outputDir, 'sb_dll'));

  _shelljs.default.cp(defaultFavIcon, outputDir);
}

async function buildStaticStandalone(options) {
  const {
    staticDir,
    configDir,
    packageJson
  } = options;
  const configType = 'PRODUCTION';
  const outputDir = _path.default.isAbsolute(options.outputDir) ? options.outputDir : _path.default.join(process.cwd(), options.outputDir);

  const dllPath = _path.default.join(__dirname, '../../dll/*');

  const defaultFavIcon = require.resolve('./public/favicon.ico');

  prepareFilesStructure(outputDir, defaultFavIcon);
  await copyAllStaticFiles(staticDir, outputDir);

  _nodeLogger.logger.info(`=> Copying prebuild dll's..`);

  _shelljs.default.cp('-r', dllPath, _path.default.join(outputDir, 'sb_dll'));

  await buildManager(configType, outputDir, configDir, options);
  await buildPreview(configType, outputDir, packageJson, options);

  _nodeLogger.logger.info(`=> Output directory: ${outputDir}`);
}

function buildStatic(_ref) {
  let {
    packageJson
  } = _ref,
      loadOptions = _objectWithoutProperties(_ref, ["packageJson"]);

  const cliOptions = (0, _cli.getProdCli)(packageJson);
  return buildStaticStandalone(_objectSpread({}, cliOptions, {}, loadOptions, {
    packageJson,
    configDir: loadOptions.configDir || cliOptions.configDir || './.storybook',
    outputDir: loadOptions.outputDir || cliOptions.outputDir || './storybook-static',
    ignorePreview: !!cliOptions.previewUrl,
    docsMode: !!cliOptions.docs
  }));
}