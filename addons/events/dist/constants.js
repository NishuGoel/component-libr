"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = exports.EVENT_PREFIX = exports.PANEL_ID = exports.ADDON_ID = exports.PARAM_KEY = void 0;
var PARAM_KEY = 'events';
exports.PARAM_KEY = PARAM_KEY;
var ADDON_ID = 'storybook/events';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var EVENT_PREFIX = "".concat(ADDON_ID, "/event");
exports.EVENT_PREFIX = EVENT_PREFIX;
var EVENTS = {
  ADD: 'add',
  EMIT: 'emit'
};
exports.EVENTS = EVENTS;