"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ADDON_ID", {
  enumerable: true,
  get: function get() {
    return _constants.ADDON_ID;
  }
});
Object.defineProperty(exports, "setOptions", {
  enumerable: true,
  get: function get() {
    return _index.setOptions;
  }
});
Object.defineProperty(exports, "withOptions", {
  enumerable: true,
  get: function get() {
    return _index.withOptions;
  }
});

var _constants = require("./constants");

var _index = require("./index");