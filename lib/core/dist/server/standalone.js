"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _buildStatic = require("./build-static");

var _buildDev = require("./build-dev");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

async function build(options = {}, frameworkOptions = {}) {
  const {
    mode = 'dev'
  } = options;

  const commonOptions = _objectSpread({}, options, {}, frameworkOptions, {
    frameworkPresets: [...(options.frameworkPresets || []), ...(frameworkOptions.frameworkPresets || [])]
  });

  if (mode === 'dev') {
    return (0, _buildDev.buildDevStandalone)(commonOptions);
  }

  if (mode === 'static') {
    return (0, _buildStatic.buildStaticStandalone)(commonOptions);
  }

  throw new Error(`'mode' parameter should be either 'dev' or 'static'`);
}

var _default = build;
exports.default = _default;