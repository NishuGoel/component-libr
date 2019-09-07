"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _constants = require("./constants");

var _BackgroundSelector = require("./containers/BackgroundSelector");

var _GridSelector = require("./containers/GridSelector");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

_addons.addons.register(_constants.ADDON_ID, function (api) {
  _addons.addons.add(_constants.ADDON_ID, {
    title: 'Backgrounds',
    type: _addons.types.TOOL,
    match: function match(_ref) {
      var viewMode = _ref.viewMode;
      return viewMode === 'story';
    },
    render: function render() {
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_BackgroundSelector.BackgroundSelector, {
        api: api
      }), _react["default"].createElement(_GridSelector.GridSelector, null));
    }
  });
});