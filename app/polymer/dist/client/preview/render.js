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

var _litHtml = require("lit-html");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Polymer component from the story?\n        Use \"() => '&lt;your-component-name&gt;&lt;/your-component-name&gt;'\" when defining the story.\n      "], ["\n        Did you forget to return the Polymer component from the story?\n        Use \"() => '&lt;your-component-name&gt;&lt;/your-component-name\\&gt;'\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rootElement = _global.document.getElementById('root');

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      selectedKind = _ref.selectedKind,
      selectedStory = _ref.selectedStory,
      showMain = _ref.showMain,
      showError = _ref.showError,
      forceRender = _ref.forceRender;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Polymer component from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
    return;
  }

  showMain();

  if (typeof element === 'string') {
    rootElement.innerHTML = element;
  } else if (element instanceof _litHtml.TemplateResult) {
    // `render` stores the TemplateInstance in the Node and tries to update based on that.
    // Since we reuse `rootElement` for all stories, remove the stored instance first.
    // But forceRender means that it's the same story, so we want too keep the state in that case.
    if (!forceRender || !rootElement.querySelector('[id="root-inner"]')) {
      rootElement.innerHTML = '<div id="root-inner"></div>';
    }

    var renderTo = rootElement.querySelector('[id="root-inner"]');
    (0, _litHtml.render)(element, renderTo);
  } else {
    rootElement.innerHTML = '';
    rootElement.appendChild(element);
  }
}