"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderMain;

var _global = require("global");

var _commonTags = require("common-tags");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Ember element from the story?\n        Use \"() => hbs('{{component}}')\" or \"() => { return {\n          template: hbs`{{component}}`\n        } }\" when defining the story.\n      "], ["\n        Did you forget to return the Ember element from the story?\n        Use \"() => hbs('{{component}}')\" or \"() => { return {\n          template: hbs\\`{{component}}\\`\n        } }\" when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var rootEl = _global.document.getElementById('root');

var config = _global.window.require("".concat(_global.window.STORYBOOK_NAME, "/config/environment"));

var app = _global.window.require("".concat(_global.window.STORYBOOK_NAME, "/app"))["default"].create(Object.assign({
  autoboot: false,
  rootElement: rootEl
}, config.APP));

var lastPromise = app.boot();
var hasRendered = false;

function render(options, el) {
  var template = options.template,
      _options$context = options.context,
      context = _options$context === void 0 ? {} : _options$context,
      element = options.element;

  if (hasRendered) {
    lastPromise = lastPromise.then(function (instance) {
      return instance.destroy();
    });
  }

  lastPromise = lastPromise.then(function () {
    var appInstancePrivate = app.buildInstance();
    return appInstancePrivate.boot().then(function () {
      return appInstancePrivate;
    });
  }).then(function (instance) {
    instance.register('component:story-mode', Ember.Component.extend(Object.assign({
      layout: template || options
    }, context)));
    var component = instance.lookup('component:story-mode');

    if (element) {
      component.appendTo(element);
      element.appendTo(el);
    } else {
      component.appendTo(el);
    }

    hasRendered = true;
    return instance;
  });
}

function renderMain(_ref) {
  var storyFn = _ref.storyFn,
      selectedKind = _ref.selectedKind,
      selectedStory = _ref.selectedStory,
      showMain = _ref.showMain,
      showError = _ref.showError;
  var element = storyFn();

  if (!element) {
    showError({
      title: "Expecting a Ember element from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
    return;
  }

  showMain();
  render(element, rootEl);
}