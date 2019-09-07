"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _rax = require("rax");

var _raxView = _interopRequireDefault(require("rax-view"));

var _styles = _interopRequireDefault(require("./styles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/** @jsx createElement */
// eslint-disable-next-line import/no-extraneous-dependencies
// eslint-disable-next-line import/no-extraneous-dependencies
function _default(storyFn) {
  return (0, _rax.createElement)(_raxView["default"], {
    style: _styles["default"].style
  }, (0, _rax.createElement)(_raxView["default"], {
    style: _styles["default"].innerStyle
  }, storyFn()));
}

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}