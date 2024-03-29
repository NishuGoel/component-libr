"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.babel = babel;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function babel(config) {
  // Ensure plugins are defined or fallback to an array to avoid empty values.
  const babelConfigPlugins = config.plugins || [];
  const extraPlugins = [[require.resolve('babel-plugin-react-docgen'), {
    DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES'
  }]]; // If `babelConfigPlugins` is not an `Array`, calling `concat` will inject it
  // as a single value, if it is an `Array` it will be spreaded.

  return _objectSpread({}, config, {
    plugins: [].concat(babelConfigPlugins, extraPlugins)
  });
}