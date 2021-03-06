"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocsPage = exports.DocsPageWrapper = exports.DocsWrapper = exports.DocsContent = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _DocumentFormatting = require("../typography/DocumentFormatting");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var breakpoint = 600;
var pageMargin = '5.55555';

var Title = _theming.styled.h1(function (_ref) {
  var theme = _ref.theme;
  return {
    // overrides h1 in DocumentFormatting
    '&&': _defineProperty({
      fontSize: theme.typography.size.m3,
      lineHeight: '32px'
    }, "@media (min-width: ".concat(breakpoint * 1, "px)"), {
      fontSize: theme.typography.size.l1,
      lineHeight: '36px'
    })
  };
});

var Subtitle = _theming.styled.h2(function (_ref2) {
  var theme = _ref2.theme;
  return {
    // overrides h2 in DocumentFormatting
    '&&': _defineProperty({
      fontWeight: theme.typography.weight.regular,
      fontSize: theme.typography.size.s3,
      lineHeight: '20px',
      borderBottom: 'none',
      marginBottom: '15px'
    }, "@media (min-width: ".concat(breakpoint * 1, "px)"), {
      fontSize: theme.typography.size.m1,
      lineHeight: '28px',
      marginBottom: '25px'
    }),
    color: theme.base === 'light' ? (0, _polished.transparentize)(0.25, theme.color.defaultText) : (0, _polished.transparentize)(0.25, theme.color.defaultText)
  };
});

var DocsContent = (0, _theming.styled)(_DocumentFormatting.DocumentFormatting)({
  maxWidth: 800,
  width: '100%'
});
exports.DocsContent = DocsContent;

var DocsWrapper = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return _defineProperty({
    background: theme.background.content,
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    padding: '4rem 20px'
  }, "@media (min-width: ".concat(breakpoint * 1, "px)"), {});
});

exports.DocsWrapper = DocsWrapper;

var DocsPageWrapper = function DocsPageWrapper(_ref5) {
  var children = _ref5.children;
  return _react["default"].createElement(DocsWrapper, null, _react["default"].createElement(DocsContent, null, children));
};

exports.DocsPageWrapper = DocsPageWrapper;
DocsPageWrapper.displayName = "DocsPageWrapper";

/**
 * An out-of-the box documentation page for components that shows the
 * title & subtitle and a collection of blocks including `Description`,
 * and `Preview`s for each of the component's stories.
 */
var DocsPage = function DocsPage(_ref6) {
  var title = _ref6.title,
      subtitle = _ref6.subtitle,
      children = _ref6.children;
  return _react["default"].createElement(_react["default"].Fragment, null, title && _react["default"].createElement(Title, null, title), subtitle && _react["default"].createElement(Subtitle, null, subtitle), children);
};

exports.DocsPage = DocsPage;