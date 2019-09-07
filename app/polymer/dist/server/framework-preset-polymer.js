"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = webpack;

var _webpack = require("webpack");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function webpack(config) {
  return _objectSpread({}, config, {
    module: _objectSpread({}, config.module, {
      rules: [...config.module.rules, {
        test: /\.html$/,
        use: [...config.module.rules[0].use, {
          loader: require.resolve('polymer-webpack-loader'),
          options: {
            processStyleLinks: true
          }
        }]
      }]
    }),
    plugins: [...config.plugins, // See https://github.com/webcomponents/webcomponentsjs/issues/794#issuecomment-386554298
    new _webpack.IgnorePlugin(/^vertx$/)]
  });
}