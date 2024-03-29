"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorStory = exports.missingStory = exports.workingStory = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _iframe = require("./iframe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _iframe.IFrame,
  title: 'UI|Preview/Iframe'
};
exports["default"] = _default;
var style = {
  width: '100%',
  height: '500px'
};

var _ref =
/*#__PURE__*/
_react["default"].createElement(_iframe.IFrame, {
  id: "iframe",
  title: "Missing",
  src: "/iframe.html?id=ui-panel--default",
  allowFullScreen: true,
  style: style,
  scale: 1.0
});

var workingStory = function workingStory() {
  return _ref;
};

exports.workingStory = workingStory;
workingStory.displayName = "workingStory";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_iframe.IFrame, {
  id: "iframe",
  title: "Missing",
  src: "/iframe.html?id=missing",
  allowFullScreen: true,
  style: style,
  scale: 1.0
});

var missingStory = function missingStory() {
  return _ref2;
};

exports.missingStory = missingStory;
missingStory.displayName = "missingStory";

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_iframe.IFrame, {
  id: "iframe",
  title: "Missing",
  src: "/iframe.html?id=core-errors--story-throws-exception",
  allowFullScreen: true,
  style: style,
  scale: 1.0
});

var errorStory = function errorStory() {
  return _ref3;
};

exports.errorStory = errorStory;
errorStory.displayName = "errorStory";
// We need to disable this one in Chromatic because the screenshot includes the uploaded URL sadly:
//   eg. https://www.chromaticqa.com/snapshot?appId=5a375b97f4b14f0020b0cda3&id=5c52edb4323f9000249aae72
errorStory.story = {
  parameters: {
    chromatic: {
      disable: true
    }
  }
};