"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addSource = addSource;
exports.withSource = withSource;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _events = require("./events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getLocation = (context, locationsMap) => locationsMap[context.id];

function sendEvent(context, source, locationsMap, mainFileLocation, dependencies, localDependencies, prefix, idsToFrameworks) {
  const channel = _addons.default.getChannel();

  const currentLocation = getLocation(context, locationsMap);
  channel.emit(_events.STORY_EVENT_ID, {
    edition: {
      source,
      mainFileLocation,
      dependencies,
      localDependencies,
      prefix,
      idsToFrameworks
    },
    story: {
      kind: context.kind,
      story: context.story
    },
    location: {
      currentLocation,
      locationsMap
    }
  });
}

function addSource(storyFn, sourceContext) {
  const {
    __STORY__: source,
    __ADDS_MAP__: locationsMap = {},
    __MAIN_FILE_LOCATION__: mainFileLocation = '/index.js',
    __MODULE_DEPENDENCIES__: dependencies = [],
    __LOCAL_DEPENDENCIES__: localDependencies = {},
    __SOURCE_PREFIX__: prefix,
    __IDS_TO_FRAMEWORKS__: idsToFrameworks
  } = sourceContext;

  const decorated = (context = {}) => {
    sendEvent(context, source, locationsMap, mainFileLocation, dependencies, localDependencies, prefix, idsToFrameworks);

    if (typeof storyFn === 'function') {
      return storyFn(context);
    }

    return storyFn;
  };

  decorated.story = (storyFn || {}).story;
  return decorated;
}

function withSource(source, locationsMap = {}, mainFileLocation = '/index.js', dependencies = [], localDependencies = {}, prefix, idsToFrameworks) {
  return (storyFn, context) => {
    sendEvent(context, source, locationsMap, mainFileLocation, dependencies, localDependencies, prefix, idsToFrameworks);
    return storyFn(context);
  };
}