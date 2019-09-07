"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAddonDecorator = void 0;

var _addons = require("@storybook/addons");

var _ContextsPreviewAPI2 = require("./preview/ContextsPreviewAPI");

var _constants = require("./shared/constants");

var createAddonDecorator = function createAddonDecorator(render) {
  var wrapper = function wrapper(getStory, context, settings) {
    var _ContextsPreviewAPI = (0, _ContextsPreviewAPI2.ContextsPreviewAPI)(),
        getContextNodes = _ContextsPreviewAPI.getContextNodes,
        getSelectionState = _ContextsPreviewAPI.getSelectionState,
        getPropsMap = _ContextsPreviewAPI.getPropsMap;

    var nodes = getContextNodes(settings);
    var state = getSelectionState();
    var props = getPropsMap(nodes, state);
    return render(nodes, props, function () {
      return getStory(context);
    });
  };

  return (0, _addons.makeDecorator)({
    name: _constants.ID,
    parameterName: _constants.PARAM,
    skipIfNoParametersOrOptions: true,
    allowDeprecatedUsage: false,
    wrapper: wrapper
  });
};

exports.createAddonDecorator = createAddonDecorator;