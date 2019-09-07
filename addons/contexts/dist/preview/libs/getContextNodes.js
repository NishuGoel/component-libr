"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContextNodes = exports._getMergedSettings = void 0;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

/* eslint-disable no-underscore-dangle */

/**
 * @private
 * Merge the top-level (global options) and the story-level (parameters) from a pair of setting;
 * @return the normalized definition for a contextual environment (i.e. a contextNode).
 */
var _getMergedSettings = function _getMergedSettings(topLevel, storyLevel) {
  return {
    // strip out special characters reserved for serializing
    nodeId: (topLevel.title || storyLevel.title || '').replace(/[,+]/g, ''),
    icon: topLevel.icon || storyLevel.icon || '',
    title: topLevel.title || storyLevel.title || '',
    components: topLevel.components || storyLevel.components || [],
    params: topLevel.params || storyLevel.params ? [].concat(_toConsumableArray(topLevel.params || []), _toConsumableArray(storyLevel.params || [])).filter(Boolean) : [{
      name: '',
      props: {}
    }],
    options: Object.assign({
      deep: false,
      disable: false,
      cancelable: false
    }, topLevel.options, {}, storyLevel.options)
  };
};
/**
 * @nosideeffects
 * Pair up settings for merging normalizations to produce the contextual definitions (i.e. contextNodes);
 * it guarantee the adding order can be respected but not duplicated.
 */


exports._getMergedSettings = _getMergedSettings;

var getContextNodes = function getContextNodes(_ref) {
  var options = _ref.options,
      parameters = _ref.parameters;
  var titles = [].concat(_toConsumableArray(options || []), _toConsumableArray(parameters || [])).filter(Boolean).map(function (_ref2) {
    var title = _ref2.title;
    return title;
  });
  return Array.from(new Set(titles)).filter(Boolean).map(function (title) {
    return _getMergedSettings(options && options.find(function (option) {
      return option.title === title;
    }) || {}, parameters && parameters.find(function (param) {
      return param.title === title;
    }) || {});
  });
};

exports.getContextNodes = getContextNodes;