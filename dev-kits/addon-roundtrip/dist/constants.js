"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = exports.PARAM_KEY = exports.PANEL_ID = exports.ADDON_ID = void 0;
var ADDON_ID = 'storybook/roundtrip';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var PARAM_KEY = "roundtrip";
exports.PARAM_KEY = PARAM_KEY;
var RESULT = "".concat(ADDON_ID, "/result");
var REQUEST = "".concat(ADDON_ID, "/request");
var EVENTS = {
  RESULT: RESULT,
  REQUEST: REQUEST
};
exports.EVENTS = EVENTS;