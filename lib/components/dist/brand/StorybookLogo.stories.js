"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normal = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _StorybookLogo = require("./StorybookLogo");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _StorybookLogo.StorybookLogo,
  title: 'Basics|Brand/StorybookLogo'
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_StorybookLogo.StorybookLogo, {
  alt: "Storybook logo"
});

var normal = function normal() {
  return _ref;
};

exports.normal = normal;
normal.displayName = "normal";