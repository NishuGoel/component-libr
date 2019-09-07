"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ADD_TESTS = exports.PANEL_ID = exports.ADDON_ID = exports.PARAM_KEY = void 0;
// addons, panels and events get unique names using a prefix
var PARAM_KEY = 'test';
exports.PARAM_KEY = PARAM_KEY;
var ADDON_ID = 'storybookjs/test';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var ADD_TESTS = "".concat(ADDON_ID, "/add_tests");
exports.ADD_TESTS = ADD_TESTS;