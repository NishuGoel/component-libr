"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeColorPicker = require("react-native-color-picker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ColorType =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ColorType, _React$Component);

  function ColorType(props) {
    var _this;

    _classCallCheck(this, ColorType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ColorType).call(this, props));

    _this.openColorPicker = function () {
      _this.setState({
        displayColorPicker: true
      });
    };

    _this.closeColorPicker = function () {
      _this.setState({
        displayColorPicker: false
      });
    };

    _this.onChangeColor = function (color) {
      var onChange = _this.props.onChange;
      onChange((0, _reactNativeColorPicker.fromHsv)(color));
    };

    _this.state = {
      displayColorPicker: false
    };
    return _this;
  }

  _createClass(ColorType, [{
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      var displayColorPicker = this.state.displayColorPicker;
      var colorStyle = {
        borderColor: 'rgb(247, 244, 244)',
        width: 30,
        height: 20,
        borderRadius: 2,
        margin: 10,
        backgroundColor: knob.value
      };
      return _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_reactNative.TouchableOpacity, {
        style: colorStyle,
        onPress: this.openColorPicker
      }), _react["default"].createElement(_reactNative.Modal, {
        supportedOrientations: ['portrait', 'landscape'],
        transparent: true,
        visible: displayColorPicker,
        onRequestClose: this.closeColorPicker
      }, _react["default"].createElement(_reactNative.TouchableWithoutFeedback, {
        onPress: this.closeColorPicker
      }, _react["default"].createElement(_reactNative.View, {
        style: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }
      }, _react["default"].createElement(_reactNative.TouchableWithoutFeedback, null, _react["default"].createElement(_reactNative.View, {
        style: {
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'rgb(247, 244, 244)',
          width: 250,
          height: 250,
          padding: 10
        }
      }, _react["default"].createElement(_reactNative.TouchableOpacity, {
        onPress: this.closeColorPicker,
        style: {
          alignSelf: 'flex-end',
          padding: 5
        }
      }, _react["default"].createElement(_reactNative.Text, {
        style: {
          fontSize: 18,
          fontWeight: 'bold'
        }
      }, "X")), _react["default"].createElement(_reactNativeColorPicker.ColorPicker, {
        onColorSelected: this.onChangeColor,
        defaultColor: knob.value,
        style: {
          flex: 1
        }
      })))))));
    }
  }]);

  return ColorType;
}(_react["default"].Component);

ColorType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].string
  }),
  onChange: _propTypes["default"].func
};
ColorType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};

ColorType.serialize = function (value) {
  return value;
};

ColorType.deserialize = function (value) {
  return value;
};

var _default = ColorType;
exports["default"] = _default;