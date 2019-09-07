"use strict";

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

var _react = _interopRequireDefault(require("react"));

var _types = _interopRequireDefault(require("./types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InvalidType = function InvalidType() {
  return _react["default"].createElement(_reactNative.Text, {
    style: {
      margin: 10
    }
  }, "Invalid Type");
};

var PropField = function PropField(_ref) {
  var onChange = _ref.onChange,
      onPress = _ref.onPress,
      knob = _ref.knob;
  var InputType = _types["default"][knob.type] || InvalidType;
  return _react["default"].createElement(_reactNative.View, null, !knob.hideLabel ? _react["default"].createElement(_reactNative.Text, {
    style: {
      marginLeft: 10,
      fontSize: 14,
      color: 'rgb(68, 68, 68)',
      fontWeight: 'bold'
    }
  }, "".concat(knob.name)) : null, _react["default"].createElement(InputType, {
    knob: knob,
    onChange: onChange,
    onPress: onPress
  }));
};

PropField.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].any,
    hideLabel: _propTypes["default"].bool,
    type: _propTypes["default"].oneOf(['text', 'number', 'color', 'boolean', 'object', 'select', 'array', 'date', 'button'])
  }).isRequired,
  onChange: _propTypes["default"].func.isRequired,
  onPress: _propTypes["default"].func.isRequired
};
var _default = PropField;
exports["default"] = _default;