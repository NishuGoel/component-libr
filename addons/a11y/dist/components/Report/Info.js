"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Info = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Wrapper = _theming.styled.div({
  padding: '12px',
  marginBottom: '10px'
});

var Help = _theming.styled.p({
  margin: '0 0 12px'
});

var Link = _theming.styled.a({
  marginTop: '12px',
  textDecoration: 'underline',
  color: 'inherit',
  display: 'block'
});

var Info = function Info(_ref) {
  var item = _ref.item;
  return _react["default"].createElement(Wrapper, null, _react["default"].createElement(Help, null, item.help), _react["default"].createElement(Link, {
    href: item.helpUrl,
    target: "_blank"
  }, "More info..."));
};

exports.Info = Info;