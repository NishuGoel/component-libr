"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.managerBabel = exports.babel = void 0;

var _findCacheDir = _interopRequireDefault(require("find-cache-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const extend = babelConfig => _objectSpread({
  // This is a feature of `babel-loader` for webpack (not Babel itself).
  // It enables a cache directory for faster-rebuilds
  // `find-cache-dir` will create the cache directory under the node_modules directory.
  cacheDirectory: (0, _findCacheDir.default)({
    name: 'storybook'
  })
}, babelConfig);

exports.managerBabel = exports.babel = extend;