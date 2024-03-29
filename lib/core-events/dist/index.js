"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STORY_THREW_EXCEPTION = exports.STORY_CHANGED = exports.STORY_ERRORED = exports.STORY_MISSING = exports.STORY_RENDERED = exports.STORY_RENDER = exports.STORY_ADDED = exports.STORY_INIT = exports.REGISTER_SUBSCRIPTION = exports.FORCE_RE_RENDER = exports.PREVIEW_KEYDOWN = exports.SELECT_STORY = exports.STORIES_CONFIGURED = exports.SET_STORIES = exports.GET_STORIES = exports.SET_CURRENT_STORY = exports.GET_CURRENT_STORY = exports.CHANNEL_CREATED = exports["default"] = void 0;
var events; // Enables: `import Events from ...`

(function (events) {
  events["CHANNEL_CREATED"] = "channelCreated";
  events["GET_CURRENT_STORY"] = "getCurrentStory";
  events["SET_CURRENT_STORY"] = "setCurrentStory";
  events["GET_STORIES"] = "getStories";
  events["SET_STORIES"] = "setStories";
  events["STORIES_CONFIGURED"] = "storiesConfigured";
  events["SELECT_STORY"] = "selectStory";
  events["PREVIEW_KEYDOWN"] = "previewKeydown";
  events["STORY_ADDED"] = "storyAdded";
  events["STORY_CHANGED"] = "storyChanged";
  events["STORY_UNCHANGED"] = "storyUnchanged";
  events["FORCE_RE_RENDER"] = "forceReRender";
  events["REGISTER_SUBSCRIPTION"] = "registerSubscription";
  events["STORY_INIT"] = "storyInit";
  events["STORY_RENDER"] = "storyRender";
  events["STORY_RENDERED"] = "storyRendered";
  events["STORY_MISSING"] = "storyMissing";
  events["STORY_ERRORED"] = "storyErrored";
  events["STORY_THREW_EXCEPTION"] = "storyThrewException";
})(events || (events = {}));

var _default = events; // Enables: `import * as Events from ...` or `import { CHANNEL_CREATED } as Events from ...`
// This is the preferred method

exports["default"] = _default;
var CHANNEL_CREATED = events.CHANNEL_CREATED;
exports.CHANNEL_CREATED = CHANNEL_CREATED;
var GET_CURRENT_STORY = events.GET_CURRENT_STORY;
exports.GET_CURRENT_STORY = GET_CURRENT_STORY;
var SET_CURRENT_STORY = events.SET_CURRENT_STORY;
exports.SET_CURRENT_STORY = SET_CURRENT_STORY;
var GET_STORIES = events.GET_STORIES;
exports.GET_STORIES = GET_STORIES;
var SET_STORIES = events.SET_STORIES;
exports.SET_STORIES = SET_STORIES;
var STORIES_CONFIGURED = events.STORIES_CONFIGURED;
exports.STORIES_CONFIGURED = STORIES_CONFIGURED;
var SELECT_STORY = events.SELECT_STORY;
exports.SELECT_STORY = SELECT_STORY;
var PREVIEW_KEYDOWN = events.PREVIEW_KEYDOWN;
exports.PREVIEW_KEYDOWN = PREVIEW_KEYDOWN;
var FORCE_RE_RENDER = events.FORCE_RE_RENDER;
exports.FORCE_RE_RENDER = FORCE_RE_RENDER;
var REGISTER_SUBSCRIPTION = events.REGISTER_SUBSCRIPTION;
exports.REGISTER_SUBSCRIPTION = REGISTER_SUBSCRIPTION;
var STORY_INIT = events.STORY_INIT;
exports.STORY_INIT = STORY_INIT;
var STORY_ADDED = events.STORY_ADDED;
exports.STORY_ADDED = STORY_ADDED;
var STORY_RENDER = events.STORY_RENDER;
exports.STORY_RENDER = STORY_RENDER;
var STORY_RENDERED = events.STORY_RENDERED;
exports.STORY_RENDERED = STORY_RENDERED;
var STORY_MISSING = events.STORY_MISSING;
exports.STORY_MISSING = STORY_MISSING;
var STORY_ERRORED = events.STORY_ERRORED;
exports.STORY_ERRORED = STORY_ERRORED;
var STORY_CHANGED = events.STORY_CHANGED;
exports.STORY_CHANGED = STORY_CHANGED;
var STORY_THREW_EXCEPTION = events.STORY_THREW_EXCEPTION;
exports.STORY_THREW_EXCEPTION = STORY_THREW_EXCEPTION;