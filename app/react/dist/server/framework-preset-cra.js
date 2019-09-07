"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpackFinal = webpackFinal;
exports.managerWebpack = managerWebpack;
exports.babelDefault = babelDefault;

var _path = _interopRequireDefault(require("path"));

var _nodeLogger = require("@storybook/node-logger");

var _craConfig = require("./cra-config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function webpackFinal(config, {
  configDir
}) {
  if (!(0, _craConfig.isReactScriptsInstalled)()) {
    _nodeLogger.logger.info('=> Using base config because react-scripts is not installed.');

    return config;
  }

  _nodeLogger.logger.info('=> Loading create-react-app config.');

  return (0, _craConfig.applyCRAWebpackConfig)(config, configDir);
}

function managerWebpack(config) {
  if (!(0, _craConfig.isReactScriptsInstalled)()) {
    return config;
  }

  return _objectSpread({}, config, {
    resolveLoader: {
      modules: ['node_modules', _path.default.join((0, _craConfig.getReactScriptsPath)(), 'node_modules')]
    }
  });
}

function babelDefault(config) {
  if (!(0, _craConfig.isReactScriptsInstalled)()) {
    return config;
  }

  return _objectSpread({}, config, {
    presets: [require.resolve('babel-preset-react-app')],
    plugins: [[require.resolve('babel-plugin-named-asset-import'), {
      loaderMap: {
        svg: {
          ReactComponent: '@svgr/webpack?-prettier,-svgo![path]'
        }
      }
    }]]
  });
}