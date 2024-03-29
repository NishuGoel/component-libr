"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdown = exports.withSubtitle = exports.text = exports.noText = exports.empty = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DocsPage = require("./DocsPage");

var storyStories = _interopRequireWildcard(require("./Story.stories"));

var previewStories = _interopRequireWildcard(require("./Preview.stories"));

var propsTableStories = _interopRequireWildcard(require("./PropsTable/PropsTable.stories"));

var sourceStories = _interopRequireWildcard(require("./Source.stories"));

var descriptionStories = _interopRequireWildcard(require("./Description.stories"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|DocsPage',
  Component: _DocsPage.DocsPage,
  decorators: [function (storyFn) {
    return _react["default"].createElement(_DocsPage.DocsWrapper, null, _react["default"].createElement(_DocsPage.DocsContent, null, storyFn()));
  }]
};
exports["default"] = _default;

var empty = function empty() {
  return _react["default"].createElement(_DocsPage.DocsPage, {
    title: null
  }, storyStories.error(), propsTableStories.error(), sourceStories.sourceUnavailable());
};

exports.empty = empty;
empty.displayName = "empty";

var noText = function noText() {
  return _react["default"].createElement(_DocsPage.DocsPage, {
    title: "no text"
  }, previewStories.single(), propsTableStories.normal(), sourceStories.jsx());
};

exports.noText = noText;
noText.displayName = "noText";
noText.story = {
  name: 'no text'
};

var text = function text() {
  return _react["default"].createElement(_DocsPage.DocsPage, {
    title: "Sensorium"
  }, descriptionStories.text(), previewStories.single(), propsTableStories.normal(), sourceStories.jsx());
};

exports.text = text;
text.displayName = "text";

var withSubtitle = function withSubtitle() {
  return _react["default"].createElement(_DocsPage.DocsPage, {
    title: "SimStim",
    subtitle: "A digital representation of the thoughts and feelings of another person."
  }, descriptionStories.text(), previewStories.single(), propsTableStories.normal(), sourceStories.jsx());
};

exports.withSubtitle = withSubtitle;
withSubtitle.displayName = "withSubtitle";
withSubtitle.story = {
  name: 'with subtitle'
};

var markdown = function markdown() {
  return _react["default"].createElement(_DocsPage.DocsPage, {
    title: "markdown"
  }, descriptionStories.markdown(), previewStories.single(), propsTableStories.normal(), sourceStories.jsx());
};

exports.markdown = markdown;
markdown.displayName = "markdown";