"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ADDON_ID = void 0;
// addons, panels and events get unique names using a prefix
var ADDON_ID = 'storybookjs/options';
exports.ADDON_ID = ADDON_ID;
var _default = {
  SET: "".concat(ADDON_ID, "/options-event")
};
exports["default"] = _default;