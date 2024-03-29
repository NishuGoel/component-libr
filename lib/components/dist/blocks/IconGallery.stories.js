"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultStyle = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _IconGallery = require("./IconGallery");

var _DocsPage = require("./DocsPage");

var _icon = require("../icon/icon");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|IconGallery',
  Component: _IconGallery.IconGallery,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_IconGallery.IconGallery, null, _react["default"].createElement(_IconGallery.IconItem, {
  name: "add"
}, _react["default"].createElement(_icon.Icons, {
  icon: "add"
})), _react["default"].createElement(_IconGallery.IconItem, {
  name: "subtract"
}, _react["default"].createElement(_icon.Icons, {
  icon: "subtract"
})), _react["default"].createElement(_IconGallery.IconItem, {
  name: "home"
}, _react["default"].createElement(_icon.Icons, {
  icon: "home"
})), _react["default"].createElement(_IconGallery.IconItem, {
  name: "facehappy"
}, _react["default"].createElement(_icon.Icons, {
  icon: "facehappy"
})), _react["default"].createElement(_IconGallery.IconItem, {
  name: "bar"
}, _react["default"].createElement("img", {
  src: "https://placehold.it/50x50",
  alt: "example"
})), _react["default"].createElement(_IconGallery.IconItem, {
  name: "bar"
}, _react["default"].createElement("img", {
  src: "https://placehold.it/50x50",
  alt: "example"
})));

var defaultStyle = function defaultStyle() {
  return _ref;
};

exports.defaultStyle = defaultStyle;
defaultStyle.displayName = "defaultStyle";