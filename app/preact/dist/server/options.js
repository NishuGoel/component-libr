"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  packageJson: _package.default,
  frameworkPresets: [require.resolve('./framework-preset-preact.js')]
};
exports.default = _default;