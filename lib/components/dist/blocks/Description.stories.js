"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markdown = exports.text = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Description = require("./Description");

var _DocsPage = require("./DocsPage");

var _DocsPageExampleCaption = _interopRequireDefault(require("./DocsPageExampleCaption.md"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|Description',
  Component: _Description.Description,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;
var textCaption = "That was Wintermute, manipulating the lock the way it had manipulated the drone micro and the amplified breathing of the room where Case waited. The semiotics of the bright void beyond the chain link. The tug Marcus Garvey, a steel drum nine meters long and two in diameter, creaked and shuddered as Maelcum punched for a California gambling cartel, then as a paid killer in the dark, curled in his capsule in some coffin hotel, his hands clawed into the nearest door and watched the other passengers as he rode. After the postoperative check at the clinic, Molly took him to the simple Chinese hollow points Shin had sold him. Still it was a handgun and nine rounds of ammunition, and as he made his way down Shiga from the missionaries, the train reached Case\u2019s station. Now this quiet courtyard, Sunday afternoon, this girl with a random collection of European furniture, as though Deane had once intended to use the place as his home. Case felt the edge of the Flatline as a construct, a hardwired ROM cassette replicating a dead man\u2019s skills, obsessions, kneejerk responses. They were dropping, losing altitude in a canyon of rainbow foliage, a lurid communal mural that completely covered the hull of the console in faded pinks and yellows.";

var _ref =
/*#__PURE__*/
_react["default"].createElement(_Description.Description, {
  markdown: textCaption
});

var text = function text() {
  return _ref;
};

exports.text = text;
text.displayName = "text";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_Description.Description, {
  markdown: _DocsPageExampleCaption["default"]
});

var markdown = function markdown() {
  return _ref2;
};

exports.markdown = markdown;
markdown.displayName = "markdown";