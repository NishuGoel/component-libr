"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = require("@storybook/addons");

var _constants = require("./constants");

var _cssResourcePanel = require("./css-resource-panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_addons.addons.register(_constants.ADDON_ID, function (api) {
  // Need to cast as any as it's not matching Addon type, to investigate
  _addons.addons.add(_constants.PANEL_ID, {
    type: _addons.types.PANEL,
    title: 'CSS resources',
    render: function render(_ref) {
      var active = _ref.active;
      return _react["default"].createElement(_cssResourcePanel.CssResourcePanel, {
        key: _constants.PANEL_ID,
        api: api,
        active: active
      });
    },
    paramKey: _constants.PARAM_KEY
  });
});