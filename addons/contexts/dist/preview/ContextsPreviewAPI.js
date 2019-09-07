"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.search");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextsPreviewAPI = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _global = require("global");

var _qs = require("qs");

var _libs = require("./libs");

var _serializers = require("../shared/serializers");

var _constants = require("../shared/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * A singleton for handling preview-manager and one-time-only side-effects.
 */
var ContextsPreviewAPI = (0, _libs.singleton)(function () {
  var channel = _addons["default"].getChannel();

  var contextsNodesMemo = null;
  var selectionState = {};
  /**
   * URL query param can be used to predetermine the contexts a story should render,
   * which is useful for performing image snapshot testing or URL sharing.
   */

  if (_global.window && _global.window.location) {
    selectionState = (0, _serializers.deserialize)((0, _qs.parse)(_global.window.location.search)[_constants.PARAM]) || {};
  }
  /**
   * (Vue specific)
   * Vue will inject getter/setter watchers on the first rendering of the addon,
   * which is why we have to keep an internal reference and use `Object.assign` to notify the watcher.
   */


  var reactivePropsMap = {};

  var updateReactiveSystem = function updateReactiveSystem(propsMap) {
    return Object.assign(reactivePropsMap, propsMap);
  };
  /**
   * Preview-manager communications.
   */
  // from manager


  channel.on(_constants.UPDATE_PREVIEW, function (state) {
    if (state) {
      selectionState = state;
      channel.emit(_constants.FORCE_RE_RENDER);
    }
  });
  channel.on(_constants.REBOOT_MANAGER, function () {
    channel.emit(_constants.UPDATE_MANAGER, contextsNodesMemo);
  });
  channel.on(_constants.SET_CURRENT_STORY, function () {
    // trash the memorization since the story-level setting may change (diffing it is much expensive)
    contextsNodesMemo = null;
  }); // to manager

  var getContextNodesWithSideEffects = function getContextNodesWithSideEffects() {
    if (contextsNodesMemo === null) {
      contextsNodesMemo = _libs.getContextNodes.apply(void 0, arguments);
      channel.emit(_constants.UPDATE_MANAGER, contextsNodesMemo);
    }

    return contextsNodesMemo;
  };
  /**
   * @Public
   * Exposed interfaces
   */


  return {
    // methods get called on Storybook event lifecycle
    getContextNodes: getContextNodesWithSideEffects,
    getSelectionState: function getSelectionState() {
      return selectionState;
    },
    getPropsMap: _libs.getPropsMap,
    // methods for processing framework specific bindings
    getRendererFrom: _libs.getRendererFrom,
    updateReactiveSystem: updateReactiveSystem
  };
});
exports.ContextsPreviewAPI = ContextsPreviewAPI;