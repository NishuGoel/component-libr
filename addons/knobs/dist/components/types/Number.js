"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.constructor");

require("core-js/modules/es.number.is-nan");

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

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

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

var RangeInput = _theming.styled.input({
  boxSizing: 'border-box',
  height: '25px',
  outline: 'none',
  border: '1px solid #f7f4f4',
  borderRadius: 2,
  fontSize: 11,
  padding: '5px',
  color: '#444'
}, {
  display: 'table-cell',
  flexGrow: 1
});

var RangeLabel = _theming.styled.span({
  paddingLeft: 5,
  paddingRight: 5,
  fontSize: 12,
  whiteSpace: 'nowrap'
});

var RangeWrapper = _theming.styled.div({
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

var NumberType =
/*#__PURE__*/
function (_Component) {
  _inherits(NumberType, _Component);

  function NumberType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NumberType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NumberType)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleChange = function (event) {
      var onChange = _this.props.onChange;
      var value = event.target.value;
      var parsedValue = Number(value);

      if (Number.isNaN(parsedValue) || value === '') {
        parsedValue = null;
      }

      onChange(parsedValue);
    };

    return _this;
  }

  _createClass(NumberType, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      var knob = this.props.knob;
      return nextProps.knob.value !== knob.value;
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      return knob.range ? _react["default"].createElement(RangeWrapper, null, _react["default"].createElement(RangeLabel, null, knob.min), _react["default"].createElement(RangeInput, {
        value: knob.value,
        type: "range",
        name: knob.name,
        min: knob.min,
        max: knob.max,
        step: knob.step,
        onChange: this.handleChange
      }), _react["default"].createElement(RangeLabel, null, "".concat(knob.value, " / ").concat(knob.max))) : _react["default"].createElement(_components.Form.Input, {
        value: knob.value,
        type: "number",
        name: knob.name,
        min: knob.min,
        max: knob.max,
        step: knob.step,
        onChange: this.handleChange,
        size: "flex"
      });
    }
  }]);

  return NumberType;
}(_react.Component);

exports["default"] = NumberType;
NumberType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
    range: _propTypes["default"].bool,
    min: _propTypes["default"].number,
    max: _propTypes["default"].number,
    step: _propTypes["default"].number
  }).isRequired,
  onChange: _propTypes["default"].func.isRequired
};

NumberType.serialize = function (value) {
  return value === null || value === undefined ? '' : String(value);
};

NumberType.deserialize = function (value) {
  return value === '' ? null : parseFloat(value);
};