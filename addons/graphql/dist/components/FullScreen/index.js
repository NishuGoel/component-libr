"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FullScreen = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _style = require("./style");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FullScreen = function FullScreen(_ref) {
  var children = _ref.children;
  return _react["default"].createElement("div", {
    style: _style.style.wrapper
  }, children);
};

exports.FullScreen = FullScreen;
FullScreen.defaultProps = {
  children: null
};
FullScreen.propTypes = {
  children: _propTypes["default"].node
};