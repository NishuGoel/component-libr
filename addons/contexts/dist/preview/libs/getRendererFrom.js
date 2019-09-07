"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRendererFrom = exports._getAggregatedWrap = void 0;

var _constants = require("../../shared/constants");

/* eslint-disable no-underscore-dangle */
var _getAggregatedWrap = function _getAggregatedWrap(h) {
  return function (components, props, options) {
    return function (vNode) {
      var last = components.length - 1;
      var isSkipped = // when set to disable
      options.disable || // when opt-out context
      options.cancelable && props === _constants.OPT_OUT;
      return isSkipped ? vNode : components // shallow clone the array since .reverse() is not pure
      .concat() // reverse the array to get the correct wrapping sequence (i.e. left(right))
      .reverse().reduce(function (acc, C, index) {
        return h(C, options.deep || index === last ? props : null, acc);
      }, vNode);
    };
  };
};
/**
 * @nosideeffects
 * Aggregate aggregated-components among all contextual nodes in a descending order;
 * this is the core of this addon, which is based on the general virtual DOM implementation.
 *
 * @param {function} h - the associated `createElement` vNode creator from the framework
 */


exports._getAggregatedWrap = _getAggregatedWrap;

var getRendererFrom = function getRendererFrom(h) {
  return function (contextNodes, propsMap, getStoryVNode) {
    return contextNodes // map over contextual nodes to get the wrapping function
    .map(function (_ref) {
      var nodeId = _ref.nodeId,
          components = _ref.components,
          options = _ref.options;
      return _getAggregatedWrap(h)(components, propsMap[nodeId], options);
    }) // reverse the array to get the correct wrapping sequence (i.e. top(down))
    .reverse() // stitch everything to get the final vNode
    .reduce(function (vNode, wrap) {
      return wrap(vNode);
    }, getStoryVNode());
  };
};

exports.getRendererFrom = getRendererFrom;