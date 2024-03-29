"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultStyle = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _ColorPalette = require("./ColorPalette");

var _DocsPage = require("./DocsPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|ColorPalette',
  Component: _ColorPalette.ColorPalette,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;

var defaultStyle = function defaultStyle() {
  return _react["default"].createElement(_ColorPalette.ColorPalette, null, _react["default"].createElement(_ColorPalette.ColorItem, {
    title: "theme.color.greyscale",
    subtitle: "Some of the greys",
    colors: ['#FFFFFF', '#F8F8F8', '#F3F3F3']
  }), _react["default"].createElement(_ColorPalette.ColorItem, {
    title: "theme.color.primary",
    subtitle: "Coral",
    colors: ['#FF4785']
  }), _react["default"].createElement(_ColorPalette.ColorItem, {
    title: "theme.color.secondary",
    subtitle: "Ocean",
    colors: ['#1EA7FD']
  }), _react["default"].createElement(_ColorPalette.ColorItem, {
    title: "theme.color.positive",
    subtitle: "Green",
    colors: ['rgba(102,191,60,1)', 'rgba(102,191,60,.8)', 'rgba(102,191,60,.6)', 'rgba(102,191,60,.3)']
  }));
};

exports.defaultStyle = defaultStyle;
defaultStyle.displayName = "defaultStyle";