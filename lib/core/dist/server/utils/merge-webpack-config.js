"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function plugins({
  plugins: defaultPlugins = []
}, {
  plugins: customPlugins = []
}) {
  return [...defaultPlugins, ...customPlugins];
}

function rules({
  rules: defaultRules = []
}, {
  rules: customRules = []
}) {
  return [...defaultRules, ...customRules];
}

function extensions({
  extensions: defaultExtensions = []
}, {
  extensions: customExtensions = []
}) {
  return [...defaultExtensions, ...customExtensions];
}

function alias({
  alias: defaultAlias = {}
}, {
  alias: customAlias = {}
}) {
  return _objectSpread({}, defaultAlias, {}, customAlias);
}

function _module({
  module: defaultModule = {}
}, {
  module: customModule = {}
}) {
  return _objectSpread({}, defaultModule, {}, customModule, {
    rules: rules(defaultModule, customModule)
  });
}

function resolve({
  resolve: defaultResolve = {}
}, {
  resolve: customResolve = {}
}) {
  return _objectSpread({}, defaultResolve, {}, customResolve, {
    alias: alias(defaultResolve, customResolve),
    extensions: extensions(defaultResolve, customResolve)
  });
}

function optimization({
  optimization: defaultOptimization = {}
}, {
  optimization: customOptimization = {}
}) {
  return _objectSpread({}, defaultOptimization, {}, customOptimization);
}

function mergeConfigs(config, customConfig) {
  return _objectSpread({}, customConfig, {}, config, {
    devtool: customConfig.devtool || config.devtool,
    plugins: plugins(config, customConfig),
    module: _module(config, customConfig),
    resolve: resolve(config, customConfig),
    optimization: optimization(config, customConfig)
  });
}

var _default = mergeConfigs;
exports.default = _default;