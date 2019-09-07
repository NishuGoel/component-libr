"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.register = register;

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _panel = _interopRequireDefault(require("./panel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function register() {
  _addons["default"].register('RNKNOBS', function () {
    var channel = _addons["default"].getChannel();

    _addons["default"].addPanel('RNKNOBS', {
      title: 'Knobs',
      // eslint-disable-next-line react/prop-types
      render: function render(_ref) {
        var active = _ref.active,
            key = _ref.key;
        return _react["default"].createElement(_panel["default"], {
          key: key,
          channel: channel,
          active: active
        });
      },
      paramKey: 'knobs'
    });
  });
}