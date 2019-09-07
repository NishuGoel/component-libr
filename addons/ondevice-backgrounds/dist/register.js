"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _constants = require("./constants");

var _BackgroundPanel = _interopRequireDefault(require("./BackgroundPanel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_addons["default"].register(_constants.ADDON_ID, function (api) {
  var channel = _addons["default"].getChannel();

  _addons["default"].addPanel(_constants.PANEL_ID, {
    title: 'Backgrounds',
    // eslint-disable-next-line react/prop-types
    render: function render(_ref) {
      var active = _ref.active;
      return _react["default"].createElement(_BackgroundPanel["default"], {
        channel: channel,
        api: api,
        active: active
      });
    },
    paramKey: _constants.PARAM_KEY
  });
});