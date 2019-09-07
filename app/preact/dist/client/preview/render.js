"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderMain;

var _preact = require("preact");

var _global = require("global");

var _commonTags = require("common-tags");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Preact element from the story?\n        Use \"() => (<MyComp/>)\" or \"() => { return <MyComp/>; }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var renderedStory;
var rootElement = _global.document ? _global.document.getElementById('root') : null;

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      selectedKind = _ref.selectedKind,
      selectedStory = _ref.selectedStory,
      showMain = _ref.showMain,
      showError = _ref.showError;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Preact element from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
    return;
  }

  (0, _preact.render)(null, rootElement, renderedStory);
  showMain();
  renderedStory = (0, _preact.render)(element, rootElement);
}