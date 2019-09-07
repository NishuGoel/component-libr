"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _server = require("@storybook/core/server");

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function extendOptions(options, extendServer) {
  const {
    manualId,
    https: secured,
    host,
    port
  } = options;
  const storybookOptions = {
    manualId,
    secured,
    host,
    port
  };
  return _objectSpread({}, options, {
    extendServer,
    packageJson: _package.default,
    mode: 'dev',
    ignorePreview: true,
    corePresets: [{
      name: _server.managerPreset,
      options: {
        managerEntry: require.resolve('../client/manager')
      }
    }, {
      name: require.resolve('./rn-options-preset.js'),
      options: {
        storybookOptions
      }
    }]
  });
}

var _default = extendOptions;
exports.default = _default;