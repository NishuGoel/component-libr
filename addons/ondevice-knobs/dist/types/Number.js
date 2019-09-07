"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NumberType =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberType, _React$Component);

  function NumberType(props) {
    var _this;

    _classCallCheck(this, NumberType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(NumberType).call(this, props));
    _this.renderNormal = _this.renderNormal.bind(_assertThisInitialized(_this));
    _this.renderRange = _this.renderRange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(NumberType, [{
    key: "renderNormal",
    value: function renderNormal() {
      var _this$props = this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;
      return _react["default"].createElement(_reactNative.TextInput, {
        style: {
          borderWidth: 1,
          borderColor: '#f7f4f4',
          borderRadius: 2,
          fontSize: 13,
          padding: 5,
          color: '#555'
        },
        underlineColorAndroid: "transparent",
        value: knob.value.toString(),
        keyboardType: "numeric",
        onChangeText: function onChangeText(val) {
          return onChange(parseFloat(val));
        }
      });
    }
  }, {
    key: "renderRange",
    value: function renderRange() {
      var _this$props2 = this.props,
          knob = _this$props2.knob,
          onChange = _this$props2.onChange;
      return _react["default"].createElement(_reactNative.Slider, {
        value: knob.value,
        minimumValue: knob.min,
        maximumValue: knob.max,
        step: knob.step,
        onSlidingComplete: function onSlidingComplete(val) {
          return onChange(parseFloat(val));
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      return _react["default"].createElement(_reactNative.View, {
        style: {
          margin: 10
        }
      }, knob.range ? this.renderRange() : this.renderNormal());
    }
  }]);

  return NumberType;
}(_react["default"].Component);

NumberType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
NumberType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].number,
    step: _propTypes["default"].number,
    min: _propTypes["default"].number,
    max: _propTypes["default"].number,
    range: _propTypes["default"].bool
  }),
  onChange: _propTypes["default"].func
};

NumberType.serialize = function (value) {
  return String(value);
};

NumberType.deserialize = function (value) {
  return parseFloat(value);
};

var _default = NumberType;
exports["default"] = _default;