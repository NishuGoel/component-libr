"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.object.define-properties");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.freeze");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = render;

var _global = require("global");

var _commonTags = require("common-tags");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n        Did you forget to return the Svelte component configuration from the story?\n        Use \"() => ({ Component: YourComponent, data: {} })\"\n        when defining the story.\n      "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var previousComponent = null;

function cleanUpPreviousStory() {
  if (!previousComponent) {
    return;
  }

  previousComponent.$destroy();
  previousComponent = null;
}

function mountView(_ref) {
  var Component = _ref.Component,
      target = _ref.target,
      props = _ref.props,
      on = _ref.on,
      Wrapper = _ref.Wrapper,
      WrapperData = _ref.WrapperData;
  var component;

  if (Wrapper) {
    var fragment = _global.document.createDocumentFragment();

    component = new Component({
      target: fragment,
      props: props
    });
    var wrapper = new Wrapper({
      target: target,
      slots: {
        "default": fragment
      },
      props: WrapperData || {}
    });
    component.$on('destroy', function () {
      wrapper.$destroy(true);
    });
  } else {
    component = new Component({
      target: target,
      props: props
    });
  }

  if (on) {
    // Attach svelte event listeners.
    Object.keys(on).forEach(function (eventName) {
      component.$on(eventName, on[eventName]);
    });
  }

  previousComponent = component;
}

function render(_ref2) {
  var storyFn = _ref2.storyFn,
      selectedKind = _ref2.selectedKind,
      selectedStory = _ref2.selectedStory,
      showMain = _ref2.showMain,
      showError = _ref2.showError;

  var _storyFn = storyFn(),
      Component = _storyFn.Component,
      props = _storyFn.props,
      on = _storyFn.on,
      Wrapper = _storyFn.Wrapper,
      WrapperData = _storyFn.WrapperData;

  cleanUpPreviousStory();
  var DefaultCompatComponent = Component ? Component["default"] || Component : undefined;
  var DefaultCompatWrapper = Wrapper ? Wrapper["default"] || Wrapper : undefined;

  if (!DefaultCompatComponent) {
    showError({
      title: "Expecting a Svelte component from the story: \"".concat(selectedStory, "\" of \"").concat(selectedKind, "\"."),
      description: (0, _commonTags.stripIndents)(_templateObject())
    });
    return;
  }

  var target = _global.document.getElementById('root');

  target.innerHTML = '';
  mountView({
    Component: DefaultCompatComponent,
    target: target,
    props: props,
    on: on,
    Wrapper: DefaultCompatWrapper,
    WrapperData: WrapperData
  });
  showMain();
}