"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FlexSpaced = _theming.styled.div({
  flex: 1,
  display: 'flex',
  '&& > *': {
    marginLeft: 10
  },
  '&& > *:first-of-type': {
    marginLeft: 0
  }
});

var FlexInput = (0, _theming.styled)(_components.Form.Input)({
  flex: 1
});

var formatDate = function formatDate(date) {
  var year = "000".concat(date.getFullYear()).slice(-4);
  var month = "0".concat(date.getMonth() + 1).slice(-2);
  var day = "0".concat(date.getDate()).slice(-2);
  return "".concat(year, "-").concat(month, "-").concat(day);
};

var formatTime = function formatTime(date) {
  var hours = "0".concat(date.getHours()).slice(-2);
  var minutes = "0".concat(date.getMinutes()).slice(-2);
  return "".concat(hours, ":").concat(minutes);
};

var DateType =
/*#__PURE__*/
function (_Component) {
  _inherits(DateType, _Component);

  function DateType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DateType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DateType)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      valid: undefined
    };
    _this.dateInput = void 0;
    _this.timeInput = void 0;

    _this.onDateChange = function (e) {
      var _this$props = _this.props,
          knob = _this$props.knob,
          onChange = _this$props.onChange;

      var _assertThisInitialize = _assertThisInitialized(_this),
          state = _assertThisInitialize.state;

      var valid = false;

      var _e$target$value$split = e.target.value.split('-'),
          _e$target$value$split2 = _slicedToArray(_e$target$value$split, 3),
          year = _e$target$value$split2[0],
          month = _e$target$value$split2[1],
          day = _e$target$value$split2[2];

      var result = new Date(knob.value);

      if (result.getTime()) {
        result.setFullYear(parseInt(year, 10));
        result.setMonth(parseInt(month, 10) - 1);
        result.setDate(parseInt(day, 10));

        if (result.getTime()) {
          valid = true;
          onChange(result.getTime());
        }
      }

      if (valid !== state.valid) {
        _this.setState({
          valid: valid
        });
      }
    };

    _this.onTimeChange = function (e) {
      var _this$props2 = _this.props,
          knob = _this$props2.knob,
          onChange = _this$props2.onChange;

      var _assertThisInitialize2 = _assertThisInitialized(_this),
          state = _assertThisInitialize2.state;

      var valid = false;

      var _e$target$value$split3 = e.target.value.split(':'),
          _e$target$value$split4 = _slicedToArray(_e$target$value$split3, 2),
          hours = _e$target$value$split4[0],
          minutes = _e$target$value$split4[1];

      var result = new Date(knob.value);

      if (result.getTime()) {
        result.setHours(parseInt(hours, 10));
        result.setMinutes(parseInt(minutes, 10));

        if (result.getTime()) {
          onChange(result.getTime());
          valid = true;
        }
      }

      if (valid !== state.valid) {
        _this.setState({
          valid: valid
        });
      }
    };

    return _this;
  }

  _createClass(DateType, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var knob = this.props.knob;
      var valid = this.state.valid;
      var value = new Date(knob.value);

      if (valid !== false) {
        this.dateInput.value = formatDate(value);
        this.timeInput.value = formatTime(value);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var knob = this.props.knob;
      var name = knob.name;
      var valid = this.state.valid;
      return name ? _react["default"].createElement(FlexSpaced, {
        style: {
          display: 'flex'
        }
      }, _react["default"].createElement(FlexInput, {
        type: "date",
        max: "9999-12-31" // I do this because of a rendering bug in chrome
        ,
        ref: function ref(el) {
          _this2.dateInput = el;
        },
        id: "".concat(name, "date"),
        name: "".concat(name, "date"),
        onChange: this.onDateChange
      }), _react["default"].createElement(FlexInput, {
        type: "time",
        id: "".concat(name, "time"),
        name: "".concat(name, "time"),
        ref: function ref(el) {
          _this2.timeInput = el;
        },
        onChange: this.onTimeChange
      }), !valid ? _react["default"].createElement("div", null, "invalid") : null) : null;
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps() {
      return {
        valid: true
      };
    }
  }]);

  return DateType;
}(_react.Component);

exports["default"] = DateType;
DateType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
DateType.propTypes = {
  // TODO: remove `any` once DefinitelyTyped/DefinitelyTyped#31280 has been resolved
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].number
  }),
  onChange: _propTypes["default"].func
};

DateType.serialize = function (value) {
  return new Date(value).getTime() || new Date().getTime();
};

DateType.deserialize = function (value) {
  return new Date(value).getTime() || new Date().getTime();
};