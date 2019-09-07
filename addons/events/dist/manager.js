"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _Panel = _interopRequireDefault(require("./components/Panel"));

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function register() {
  _addons["default"].register(_constants.ADDON_ID, function (api) {
    _addons["default"].addPanel(_constants.PANEL_ID, {
      title: 'Events',
      render: function render(_ref) {
        var active = _ref.active,
            key = _ref.key;
        return _react["default"].createElement(_Panel["default"], {
          key: key,
          api: api,
          active: active
        });
      },
      paramKey: _constants.PARAM_KEY
    });
  });
}