"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PANEL_ID = exports.ADDON_ID = exports.PARAM_KEY = void 0;
var PARAM_KEY = 'background';
exports.PARAM_KEY = PARAM_KEY;
var ADDON_ID = 'storybook-addon-background';
exports.ADDON_ID = ADDON_ID;
var PANEL_ID = "".concat(ADDON_ID, "/background-panel");
exports.PANEL_ID = PANEL_ID;
var _default = {
  SET: "".concat(ADDON_ID, ":set"),
  UNSET: "".concat(ADDON_ID, ":unset"),
  UPDATE_BACKGROUND: "".concat(ADDON_ID, ":update")
};
exports["default"] = _default;