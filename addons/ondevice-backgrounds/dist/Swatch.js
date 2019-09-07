"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Swatch = function Swatch(_ref) {
  var name = _ref.name,
      value = _ref.value,
      setBackground = _ref.setBackground;
  return _react["default"].createElement(_reactNative.TouchableOpacity, {
    style: {
      borderRadius: 4,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.2)',
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 10
    },
    onPress: function onPress() {
      return setBackground(value);
    }
  }, _react["default"].createElement(_reactNative.View, {
    style: {
      flex: 1,
      backgroundColor: value,
      height: 40
    }
  }), _react["default"].createElement(_reactNative.View, {
    style: {
      padding: 4,
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  }, _react["default"].createElement(_reactNative.Text, null, name, ":"), _react["default"].createElement(_reactNative.Text, null, value)));
};

Swatch.propTypes = {
  name: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].string.isRequired,
  setBackground: _propTypes["default"].func.isRequired
};
var _default = Swatch;
exports["default"] = _default;