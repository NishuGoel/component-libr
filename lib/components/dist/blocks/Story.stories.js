"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inline = exports.error = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Story = require("./Story");

var _DocsPage = require("./DocsPage");

var _Button = require("../Button/Button");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|Story',
  Component: _Story.Story,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;

var error = function error() {
  return _react["default"].createElement(_Story.Story, {
    error: _Story.StoryError.NO_STORY
  });
};

exports.error = error;
error.displayName = "error";

var _ref =
/*#__PURE__*/
_react["default"].createElement(_Button.Button, {
  secondary: true
}, "Hello Button");

var buttonFn = function buttonFn() {
  return _ref;
};

buttonFn.displayName = "buttonFn";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_Story.Story, {
  inline: true,
  storyFn: buttonFn,
  title: "hello button"
});

var inline = function inline() {
  return _ref2;
};

exports.inline = inline;
inline.displayName = "inline";