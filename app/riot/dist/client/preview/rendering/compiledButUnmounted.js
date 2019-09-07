"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderCompiledButUnmounted;

var _riot = require("riot");

function renderCompiledButUnmounted(component) {
  (0, _riot.mount)('root', component.tagName, component.opts || {});
}