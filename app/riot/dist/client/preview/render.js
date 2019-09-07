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

var _global = require("global");

var _commonTags = require("common-tags");

var _riot = require("riot");

var _rendering = require("./rendering");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the component snippet from the story?\n        Use \"() => <your snippet or node>\" or when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      selectedKind = _ref.selectedKind,
      selectedStory = _ref.selectedStory,
      _ref$showMain = _ref.showMain,
      showMain = _ref$showMain === void 0 ? function () {} : _ref$showMain,
      _ref$showError = _ref.showError,
      showError = _ref$showError === void 0 ? function () {} : _ref$showError;
  showMain();
  (0, _riot.unregister)('#root');

  var rootElement = _global.document.getElementById('root');

  rootElement.innerHTML = '';
  rootElement.dataset.is = 'root';
  var element = storyFn();
  var rendered = (0, _rendering.render)(element);

  if (!rendered) {
    showError({
      title: "Expecting a riot snippet or a riot component from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
  }

  return rendered;
}