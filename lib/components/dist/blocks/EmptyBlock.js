"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyBlock = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Wrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    backgroundColor: theme.base === 'light' ? 'rgba(0,0,0,.01)' : 'rgba(255,255,255,.01)',
    borderRadius: theme.appBorderRadius,
    border: "1px dashed ".concat(theme.appBorderColor),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    margin: '25px 0 40px',
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.4, theme.color.defaultText) : (0, _polished.transparentize)(0.6, theme.color.defaultText)
  };
});

var EmptyBlock = function EmptyBlock(props) {
  return _react["default"].createElement(Wrapper, props);
};

exports.EmptyBlock = EmptyBlock;
EmptyBlock.displayName = "EmptyBlock";