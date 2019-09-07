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

var TextType = function TextType(_ref) {
  var knob = _ref.knob,
      onChange = _ref.onChange;
  return _react["default"].createElement(_reactNative.TextInput, {
    style: {
      borderWidth: 1,
      borderColor: '#f7f4f4',
      borderRadius: 2,
      fontSize: 13,
      padding: 5,
      margin: 10,
      color: '#555'
    },
    id: knob.name,
    value: knob.value,
    onChangeText: onChange,
    underlineColorAndroid: "transparent"
  });
};

TextType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
TextType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func
};

TextType.serialize = function (value) {
  return value;
};

TextType.deserialize = function (value) {
  return value;
};

var _default = TextType;
exports["default"] = _default;