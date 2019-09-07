"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withContexts = exports.renderReact = void 0;

var _react = _interopRequireDefault(require("react"));

var _index = require("../../index");

var _ContextsPreviewAPI2 = require("../ContextsPreviewAPI");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * This is the framework specific bindings for React.
 * '@storybook/react' expects the returning object from a decorator to be a 'React Element' (vNode).
 */
var renderReact = function renderReact(contextNodes, propsMap, getStoryVNode) {
  var _ContextsPreviewAPI = (0, _ContextsPreviewAPI2.ContextsPreviewAPI)(),
      getRendererFrom = _ContextsPreviewAPI.getRendererFrom;

  return getRendererFrom(_react["default"].createElement)(contextNodes, propsMap, getStoryVNode);
};

exports.renderReact = renderReact;
var withContexts = (0, _index.createAddonDecorator)(renderReact);
exports.withContexts = withContexts;