"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ActionLogger = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _Inspect = _interopRequireDefault(require("./Inspect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ActionLogger = function ActionLogger(_ref) {
  var actions = _ref.actions,
      onClear = _ref.onClear;
  return _react["default"].createElement(_reactNative.ScrollView, null, _react["default"].createElement(_reactNative.ScrollView, {
    horizontal: true
  }, _react["default"].createElement(_reactNative.View, null, actions.map(function (action) {
    return _react["default"].createElement(_reactNative.View, {
      key: action.id,
      style: {
        flexDirection: 'row'
      }
    }, _react["default"].createElement(_reactNative.View, null, action.count > 1 ? _react["default"].createElement(_reactNative.Text, null, action.count) : null), _react["default"].createElement(_reactNative.View, {
      style: {
        flexGrow: 1
      }
    }, _react["default"].createElement(_Inspect["default"], {
      name: action.data.name,
      value: action.data.args || action.data
    })));
  }))), _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_reactNative.Button, {
    onPress: onClear,
    title: "CLEAR"
  })));
};

exports.ActionLogger = ActionLogger;
var _default = ActionLogger;
exports["default"] = _default;