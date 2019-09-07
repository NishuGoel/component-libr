"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "setupGraphiQL", {
  enumerable: true,
  get: function get() {
    return _preview.setupGraphiQL;
  }
});
exports.PARAM_KEY = exports.ADDON_ID = void 0;

var _preview = require("./preview");

var ADDON_ID = 'graphiql';
exports.ADDON_ID = ADDON_ID;
var PARAM_KEY = ADDON_ID;
exports.PARAM_KEY = PARAM_KEY;