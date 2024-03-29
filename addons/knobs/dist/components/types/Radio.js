"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RadiosWrapper = _theming.styled.div(function (_ref) {
  var isInline = _ref.isInline;
  return isInline ? {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    '> * + *': {
      marginLeft: 10
    }
  } : {};
});

var RadioLabel = _theming.styled.label({
  padding: '3px 0 3px 5px',
  lineHeight: '18px',
  display: 'inline-block'
});

var RadiosType =
/*#__PURE__*/
function (_Component) {
  _inherits(RadiosType, _Component);

  function RadiosType() {
    _classCallCheck(this, RadiosType);

    return _possibleConstructorReturn(this, _getPrototypeOf(RadiosType).apply(this, arguments));
  }

  _createClass(RadiosType, [{
    key: "renderRadioButtonList",
    value: function renderRadioButtonList(_ref2) {
      var _this = this;

      var options = _ref2.options;

      if (Array.isArray(options)) {
        return options.map(function (val) {
          return _this.renderRadioButton(val, val);
        });
      }

      return Object.keys(options).map(function (key) {
        return _this.renderRadioButton(key, options[key]);
      });
    }
  }, {
    key: "renderRadioButton",
    value: function renderRadioButton(label, value) {
      var opts = {
        label: label,
        value: value
      };
      var _this$props = this.props,
          _onChange = _this$props.onChange,
          knob = _this$props.knob;
      var name = knob.name;
      var id = "".concat(name, "-").concat(opts.value);
      return _react["default"].createElement("div", {
        key: id
      }, _react["default"].createElement("input", {
        type: "radio",
        id: id,
        name: name,
        value: opts.value,
        onChange: function onChange(e) {
          return _onChange(e.target.value);
        },
        checked: value === knob.value
      }), _react["default"].createElement(RadioLabel, {
        htmlFor: id
      }, label));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          knob = _this$props2.knob,
          isInline = _this$props2.isInline;
      return _react["default"].createElement(RadiosWrapper, {
        isInline: isInline
      }, this.renderRadioButtonList(knob));
    }
  }]);

  return RadiosType;
}(_react.Component);

RadiosType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  },
  isInline: false
};
RadiosType.propTypes = {
  // TODO: remove `any` once DefinitelyTyped/DefinitelyTyped#31280 has been resolved
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].string,
    options: _propTypes["default"].oneOfType([_propTypes["default"].array, _propTypes["default"].object])
  }),
  onChange: _propTypes["default"].func,
  isInline: _propTypes["default"].bool
};

RadiosType.serialize = function (value) {
  return value;
};

RadiosType.deserialize = function (value) {
  return value;
};

var _default = RadiosType;
exports["default"] = _default;