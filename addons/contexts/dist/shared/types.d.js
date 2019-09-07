"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ManagerAPI", {
  enumerable: true,
  get: function get() {
    return _api.API;
  }
});

var _api = require("@storybook/api");