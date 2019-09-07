"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.css = exports.jsx = exports.sourceUnavailable = exports.noStory = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Source = require("./Source");

var _DocsPage = require("./DocsPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|Source',
  Component: _Source.Source,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;

var noStory = function noStory() {
  return _react["default"].createElement(_Source.Source, {
    error: _Source.SourceError.NO_STORY
  });
};

exports.noStory = noStory;
noStory.displayName = "noStory";
noStory.story = {
  name: 'no story'
};

var sourceUnavailable = function sourceUnavailable() {
  return _react["default"].createElement(_Source.Source, {
    error: _Source.SourceError.SOURCE_UNAVAILABLE
  });
};

exports.sourceUnavailable = sourceUnavailable;
sourceUnavailable.displayName = "sourceUnavailable";
sourceUnavailable.story = {
  name: 'source unavailable'
};
var jsxCode = "\n<MyComponent boolProp scalarProp={1} complexProp={{ foo: 1, bar: '2' }}>\n  <SomeOtherComponent funcProp={(a) => a.id} />\n</MyComponent>\n".trim();
var jsxProps = {};

var _ref =
/*#__PURE__*/
_react["default"].createElement(_Source.Source, {
  code: jsxCode,
  language: "jsx"
});

var jsx = function jsx() {
  return _ref;
};

exports.jsx = jsx;
jsx.displayName = "jsx";
var cssCode = "\n@-webkit-keyframes blinker {\n  from { opacity: 1.0; }\n  to { opacity: 0.0; }\n}\n\n.waitingForConnection {\n  -webkit-animation-name: blinker;\n  -webkit-animation-iteration-count: infinite;\n  -webkit-animation-timing-function: cubic-bezier(.5, 0, 1, 1);\n  -webkit-animation-duration: 1.7s;\n}\n".trim();

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_Source.Source, {
  code: cssCode,
  language: "css"
});

var css = function css() {
  return _ref2;
};

exports.css = css;
css.displayName = "css";