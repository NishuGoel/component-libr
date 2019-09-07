"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withContexts = exports.renderPreact = void 0;

var _preact = _interopRequireDefault(require("preact"));

var _index = require("../../index");

var _ContextsPreviewAPI2 = require("../ContextsPreviewAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * This is the framework specific bindings for Preact.
 * '@storybook/preact' expects the returning object from a decorator to be a 'Preact vNode'.
 */
var renderPreact = function renderPreact(contextNodes, propsMap, getStoryVNode) {
  var _ContextsPreviewAPI = (0, _ContextsPreviewAPI2.ContextsPreviewAPI)(),
      getRendererFrom = _ContextsPreviewAPI.getRendererFrom;

  return getRendererFrom(_preact["default"].h)(contextNodes, propsMap, getStoryVNode);
};

exports.renderPreact = renderPreact;
var withContexts = (0, _index.createAddonDecorator)(renderPreact);
exports.withContexts = withContexts;