"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _theming = require("@storybook/theming");

var Indicator = _theming.styled.div(function (_ref) {
  var color = _ref.color,
      size = _ref.size;
  return {
    boxSizing: 'border-box',
    padding: "0 ".concat(size / 2, "px"),
    width: "fit-content",
    minHeight: size,
    fontSize: size / 1.4,
    lineHeight: "".concat(size, "px"),
    color: 'white',
    textTransform: 'uppercase',
    borderRadius: size / 2,
    backgroundColor: color
  };
}, function (_ref2) {
  var overrides = _ref2.overrides;
  return Object.assign({}, overrides);
});

Indicator.defaultProps = {
  right: false,
  children: ''
};
var _default = Indicator;
exports["default"] = _default;