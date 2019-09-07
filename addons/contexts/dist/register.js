"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _react = require("react");

var _addons = _interopRequireWildcard(require("@storybook/addons"));

var _ContextsManager = require("./manager/ContextsManager");

var _constants = require("./shared/constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_addons["default"].register(_constants.ID, function (api) {
  return _addons["default"].add(_constants.ID, {
    title: _constants.ID,
    type: _addons.types.TOOL,
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: function render() {
      return (0, _react.createElement)(_ContextsManager.ContextsManager, {
        api: api
      });
    }
  });
});