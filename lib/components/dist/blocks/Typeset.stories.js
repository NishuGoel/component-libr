"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withWeightText = exports.withFontWeight = exports.withFontSizes = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Typeset = require("./Typeset");

var _DocsPage = require("./DocsPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|Typeset',
  Component: _Typeset.Typeset,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;
var fontSizes = [12, 14, 16, 20, 24, 32, 40, 48];
var fontWeight = 900;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_Typeset.Typeset, {
  fontSizes: fontSizes
});

var withFontSizes = function withFontSizes() {
  return _ref;
};

exports.withFontSizes = withFontSizes;
withFontSizes.displayName = "withFontSizes";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_Typeset.Typeset, {
  fontSizes: fontSizes,
  fontWeight: fontWeight
});

var withFontWeight = function withFontWeight() {
  return _ref2;
};

exports.withFontWeight = withFontWeight;
withFontWeight.displayName = "withFontWeight";

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_Typeset.Typeset, {
  fontSizes: fontSizes,
  fontWeight: fontWeight,
  sampleText: "Heading"
});

var withWeightText = function withWeightText() {
  return _ref3;
};

exports.withWeightText = withWeightText;
withWeightText.displayName = "withWeightText";