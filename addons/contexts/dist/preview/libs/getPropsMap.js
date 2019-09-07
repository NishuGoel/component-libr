"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPropsMap = exports._getPropsByParamName = void 0;

var _constants = require("../../shared/constants");

/* eslint-disable no-underscore-dangle */
var _getPropsByParamName = function _getPropsByParamName(params) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _ref = // when opt-out context
  options.cancelable && name === _constants.OPT_OUT && {
    props: _constants.OPT_OUT
  } || // when menu option get selected
  name && params.find(function (param) {
    return param.name === name;
  }) || // when being initialized
  params.find(function (param) {
    return !!param["default"];
  }) || // fallback to the first
  params[0] || // fallback for destructuring
  {},
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? null : _ref$props;

  return props;
};
/**
 * @nosideeffects
 * Collect the propsMap from Nodes based on a controlled state tracker.
 */


exports._getPropsByParamName = _getPropsByParamName;

var getPropsMap = function getPropsMap(contextNodes, selectionState) {
  return contextNodes.reduce(function (agg, _ref2) {
    var nodeId = _ref2.nodeId,
        params = _ref2.params,
        options = _ref2.options;
    // eslint-disable-next-line no-param-reassign
    agg[nodeId] = _getPropsByParamName(params, selectionState[nodeId], options);
    return agg;
  }, Object());
};

exports.getPropsMap = getPropsMap;