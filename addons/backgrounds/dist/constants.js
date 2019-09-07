"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EVENTS = exports.PARAM_KEY = exports.ADDON_ID = void 0;
var ADDON_ID = 'storybook/background';
exports.ADDON_ID = ADDON_ID;
var PARAM_KEY = 'backgrounds';
exports.PARAM_KEY = PARAM_KEY;
var EVENTS = {
  UPDATE: "".concat(ADDON_ID, "/update")
};
exports.EVENTS = EVENTS;