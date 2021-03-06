"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basic = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SettingsFooter = _interopRequireDefault(require("./SettingsFooter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _SettingsFooter["default"],
  title: 'UI|Settings/SettingsFooter',
  decorators: [function (storyFn) {
    return _react["default"].createElement("div", {
      style: {
        width: '600px',
        margin: '2rem auto'
      }
    }, storyFn());
  }]
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_SettingsFooter["default"], null);

var basic = function basic() {
  return _ref;
};

exports.basic = basic;
basic.displayName = "basic";