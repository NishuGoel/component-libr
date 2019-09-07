"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forceReRender = exports.configure = exports.load = exports.storiesOf = exports.raw = exports.getStorybook = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.setAddon = exports.WRAPS = void 0;

var _client = require("@storybook/core/client");

var _vue = _interopRequireDefault(require("vue"));

require("./globals");

var _render = _interopRequireWildcard(require("./render"));

var _util = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WRAPS = 'STORYBOOK_WRAPS';
exports.WRAPS = WRAPS;

function prepare(rawStory, innerStory) {
  var _Vue$extend;

  var story = rawStory; // eslint-disable-next-line no-underscore-dangle

  if (!story._isVue) {
    if (typeof story === 'string') {
      story = {
        template: story
      };
    }

    if (innerStory) {
      story.components = Object.assign({}, story.components || {}, {
        story: innerStory
      });
    }

    story = _vue["default"].extend(story);
  } else if (story.options[WRAPS]) {
    return story;
  }

  return _vue["default"].extend((_Vue$extend = {}, _defineProperty(_Vue$extend, WRAPS, story), _defineProperty(_Vue$extend, _render.VALUES, Object.assign({}, innerStory ? innerStory.options[_render.VALUES] : {}, {}, (0, _util.extractProps)(story))), _defineProperty(_Vue$extend, "functional", true), _defineProperty(_Vue$extend, "render", function render(h, _ref) {
    var data = _ref.data,
        parent = _ref.parent,
        children = _ref.children;
    return h(story, Object.assign({}, data, {
      props: Object.assign({}, data.props || {}, {}, parent.$root[_render.VALUES])
    }), children);
  }), _Vue$extend));
}

function decorateStory(getStory, decorators) {
  return decorators.reduce(function (decorated, decorator) {
    return function () {
      var context = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var story;
      var decoratedStory = decorator(function () {
        var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        story = decorated(p ? Object.assign({}, context, {}, p, {
          parameters: Object.assign({}, context.parameters, {}, p.parameters)
        }) : context);
        return story;
      }, context);

      if (!story) {
        story = decorated(context);
      }

      if (decoratedStory === story) {
        return story;
      }

      return prepare(decoratedStory, story);
    };
  }, function (context) {
    return prepare(getStory(context));
  });
}

var _start = (0, _client.start)(_render["default"], {
  decorateStory: decorateStory
}),
    coreLoad = _start.load,
    clientApi = _start.clientApi,
    configApi = _start.configApi,
    forceReRender = _start.forceReRender;

exports.forceReRender = forceReRender;
var setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    addParameters = clientApi.addParameters,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook,
    raw = clientApi.raw;
exports.raw = raw;
exports.getStorybook = getStorybook;
exports.clearDecorators = clearDecorators;
exports.addParameters = addParameters;
exports.addDecorator = addDecorator;
exports.setAddon = setAddon;
var framework = 'vue';

var storiesOf = function storiesOf() {
  return clientApi.storiesOf.apply(clientApi, arguments).addParameters({
    framework: framework
  });
};

exports.storiesOf = storiesOf;

var load = function load() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return coreLoad.apply(void 0, args.concat([framework]));
};

exports.load = load;
var configure = configApi.configure;
exports.configure = configure;