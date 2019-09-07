"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ButtonType = function ButtonType(_ref) {
  var knob = _ref.knob,
      _onPress = _ref.onPress;
  return _react["default"].createElement(_reactNative.TouchableOpacity, {
    style: {
      margin: 10
    },
    onPress: function onPress() {
      return _onPress(knob);
    }
  }, _react["default"].createElement(_reactNative.Text, {
    style: {
      fontSize: 17,
      color: '#007aff'
    }
  }, knob.name));
};

ButtonType.defaultProps = {
  knob: {}
};
ButtonType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string
  }),
  onPress: _propTypes["default"].func.isRequired
};

ButtonType.serialize = function (value) {
  return value;
};

ButtonType.deserialize = function (value) {
  return value;
};

var _default = ButtonType;
exports["default"] = _default;