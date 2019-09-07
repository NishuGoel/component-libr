"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-float");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeModalDatetimePicker = _interopRequireDefault(require("react-native-modal-datetime-picker"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

// TODO seconds support
var DateType =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(DateType, _PureComponent);

  function DateType() {
    var _this;

    _classCallCheck(this, DateType);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DateType).call(this));

    _this.showDatePicker = function () {
      _this.setState({
        isDateVisible: true
      });
    };

    _this.showTimePicker = function () {
      _this.setState({
        isTimeVisible: true
      });
    };

    _this.hidePicker = function () {
      _this.setState({
        isDateVisible: false,
        isTimeVisible: false
      });
    };

    _this.onDatePicked = function (date) {
      var value = date.valueOf();
      var onChange = _this.props.onChange;
      onChange(value);

      _this.hidePicker();
    };

    _this.state = {
      isDateVisible: false,
      isTimeVisible: false
    };
    return _this;
  }

  _createClass(DateType, [{
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      var _this$state = this.state,
          isTimeVisible = _this$state.isTimeVisible,
          isDateVisible = _this$state.isDateVisible;
      var d = new Date(knob.value); // https://stackoverflow.com/a/30272803

      var dateString = ["0".concat(d.getDate()).slice(-2), "0".concat(d.getMonth() + 1).slice(-2), d.getFullYear()].join('-');
      var timeString = "".concat("0".concat(d.getHours()).slice(-2), ":").concat("0".concat(d.getMinutes()).slice(-2));
      return _react["default"].createElement(_reactNative.View, {
        style: {
          margin: 10
        }
      }, _react["default"].createElement(_reactNative.View, {
        style: {
          flexDirection: 'row'
        }
      }, _react["default"].createElement(_reactNative.TouchableOpacity, {
        style: {
          borderWidth: 1,
          borderColor: '#f7f4f4',
          borderRadius: 2,
          padding: 5
        },
        onPress: this.showDatePicker
      }, _react["default"].createElement(_reactNative.Text, {
        style: {
          fontSize: 13,
          color: '#555'
        }
      }, dateString)), _react["default"].createElement(_reactNative.TouchableOpacity, {
        style: {
          borderWidth: 1,
          borderColor: '#f7f4f4',
          borderRadius: 2,
          padding: 5,
          marginLeft: 5
        },
        onPress: this.showTimePicker
      }, _react["default"].createElement(_reactNative.Text, {
        style: {
          fontSize: 13,
          color: '#555'
        }
      }, timeString))), _react["default"].createElement(_reactNativeModalDatetimePicker["default"], {
        date: d,
        isVisible: isTimeVisible || isDateVisible,
        mode: isTimeVisible ? 'time' : 'date',
        onConfirm: this.onDatePicked,
        onCancel: this.hidePicker
      }));
    }
  }]);

  return DateType;
}(_react.PureComponent);

DateType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
DateType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].number
  }),
  onChange: _propTypes["default"].func
};

DateType.serialize = function (value) {
  return String(value);
};

DateType.deserialize = function (value) {
  return parseFloat(value);
};

var _default = DateType;
exports["default"] = _default;