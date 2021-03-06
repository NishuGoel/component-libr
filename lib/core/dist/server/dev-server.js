"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _express = require("express");

var _webpack = _interopRequireDefault(require("webpack"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _nodeLogger = require("@storybook/node-logger");

var _middleware = require("./utils/middleware");

var _logConfig = require("./logConfig");

var _config = _interopRequireDefault(require("./config"));

var _managerConfig = _interopRequireDefault(require("./manager/manager-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const dllPath = _path.default.join(__dirname, '../../dll');

const cache = {};
let previewProcess;
let previewReject;
let resolved = false;
const router = new _express.Router();

function _default(options) {
  const configDir = _path.default.resolve(options.configDir);

  const outputDir = _path.default.resolve(options.outputDir || _path.default.join(__dirname, '..', 'public'));

  const configType = 'DEVELOPMENT';
  const startTime = process.hrtime();
  let managerTotalTime;
  let previewTotalTime;
  const managerPromise = (0, _managerConfig.default)(_objectSpread({
    configType,
    outputDir,
    configDir,
    cache,
    corePresets: [require.resolve('./manager/manager-preset.js')]
  }, options)).then(config => {
    if (options.debugWebpack) {
      (0, _logConfig.logConfig)('Manager webpack config', config, _nodeLogger.logger);
    }

    return new Promise((resolve, reject) => {
      (0, _webpack.default)(config).watch({
        aggregateTimeout: 1
      }, (err, stats) => {
        managerTotalTime = process.hrtime(startTime);

        if (!resolved && (err || stats.hasErrors())) {
          const error = new Error('Manager build is broken');
          error.error = err;
          error.close = true;
          error.stats = stats;

          _nodeLogger.logger.line();

          _nodeLogger.logger.line();

          try {
            previewReject(error);
            previewProcess.close();

            _nodeLogger.logger.warn('force closed preview build');
          } catch (e) {
            _nodeLogger.logger.warn('Unable to close preview build!');
          }

          _nodeLogger.logger.line();

          reject(error);
        } else {
          resolve(stats);
        }
      });
    });
  });
  const previewPromise = options.ignorePreview ? new Promise(resolve => resolve()) : (0, _config.default)(_objectSpread({
    configType,
    outputDir,
    cache,
    corePresets: [require.resolve('./preview/preview-preset.js')],
    overridePresets: [require.resolve('./preview/custom-webpack-preset.js')]
  }, options)).then(previewConfig => {
    if (options.debugWebpack) {
      (0, _logConfig.logConfig)('Preview webpack config', previewConfig, _nodeLogger.logger);
    } // remove the leading '/'


    let {
      publicPath
    } = previewConfig.output;

    if (publicPath[0] === '/') {
      publicPath = publicPath.slice(1);
    }

    const previewCompiler = (0, _webpack.default)(previewConfig);

    const devMiddlewareOptions = _objectSpread({
      publicPath: previewConfig.output.publicPath,
      watchOptions: _objectSpread({
        aggregateTimeout: 1
      }, previewConfig.watchOptions || {}),
      // this actually causes 0 (regular) output from wdm & webpack
      logLevel: 'warn',
      clientLogLevel: 'warning',
      noInfo: true
    }, previewConfig.devServer);

    const webpackDevMiddlewareInstance = (0, _webpackDevMiddleware.default)(previewCompiler, devMiddlewareOptions);
    router.use(webpackDevMiddlewareInstance);
    router.use((0, _webpackHotMiddleware.default)(previewCompiler));
    return new Promise((resolve, reject) => {
      previewReject = reject;
      webpackDevMiddlewareInstance.waitUntilValid(stats => {
        previewTotalTime = process.hrtime(startTime);

        if (!stats) {
          reject(new Error('no stats after building preview'));
        } else if (stats.hasErrors()) {
          reject(stats);
        } else {
          resolve(stats);
        }
      });
      previewProcess = webpackDevMiddlewareInstance;
    });
  }); // custom middleware

  const middlewareFn = (0, _middleware.getMiddleware)(configDir);
  middlewareFn(router);
  return Promise.all([managerPromise, previewPromise]).then(([managerStats, previewStats]) => {
    resolved = true;
    router.get('/', (request, response) => {
      response.set('Content-Type', 'text/html');
      response.sendFile(_path.default.join(`${outputDir}/index.html`));
    });
    router.get(/\/sb_dll\/(.+\.js)$/, (request, response) => {
      response.set('Content-Type', 'text/javascript');
      response.sendFile(_path.default.join(`${dllPath}/${request.params[0]}`));
    });
    router.get(/\/sb_dll\/(.+\.LICENCE)$/, (request, response) => {
      response.set('Content-Type', 'text/html');
      response.sendFile(_path.default.join(`${dllPath}/${request.params[0]}`));
    });
    router.get(/(.+\.js)$/, (request, response) => {
      response.set('Content-Type', 'text/javascript');
      response.sendFile(_path.default.join(`${outputDir}/${request.params[0]}`));
    });
    return {
      previewStats,
      managerStats,
      managerTotalTime,
      previewTotalTime,
      router
    };
  });
}