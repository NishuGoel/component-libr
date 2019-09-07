"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "FORCE_RE_RENDER", {
  enumerable: true,
  get: function get() {
    return _coreEvents.FORCE_RE_RENDER;
  }
});
Object.defineProperty(exports, "SET_CURRENT_STORY", {
  enumerable: true,
  get: function get() {
    return _coreEvents.SET_CURRENT_STORY;
  }
});
exports.UPDATE_PREVIEW = exports.UPDATE_MANAGER = exports.REBOOT_MANAGER = exports.OPT_OUT = exports.PARAM = exports.ID = void 0;

var _coreEvents = require("@storybook/core-events");

// configs
var ID = 'addon-contexts';
exports.ID = ID;
var PARAM = 'contexts'; // tokens

/**
 * OPT_OUT is a token for skipping a context, dundering the string to avoid name collisions;
 * ES6 Symbol is not available due to stringify used in Storybook event system via the channel.
 */

exports.PARAM = PARAM;
var OPT_OUT = '__OPT_OUT__'; // events

exports.OPT_OUT = OPT_OUT;
var REBOOT_MANAGER = "".concat(ID, "/REBOOT_MANAGER");
exports.REBOOT_MANAGER = REBOOT_MANAGER;
var UPDATE_MANAGER = "".concat(ID, "/UPDATE_MANAGER");
exports.UPDATE_MANAGER = UPDATE_MANAGER;
var UPDATE_PREVIEW = "".concat(ID, "/UPDATE_PREVIEW");
exports.UPDATE_PREVIEW = UPDATE_PREVIEW;