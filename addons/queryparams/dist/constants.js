"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARAM_KEY = exports.PANEL_ID = exports.ADDON_ID = void 0;
var ADDON_ID = 'storybook/queryparams';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/panel");
exports.PANEL_ID = PANEL_ID;
var PARAM_KEY = "query";
exports.PARAM_KEY = PARAM_KEY;