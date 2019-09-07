"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactLifecyclesCompat = require("react-lifecycles-compat");

var _isEqual = _interopRequireDefault(require("lodash/isEqual"));

var _theming = require("@storybook/theming");

var _formatJson = _interopRequireDefault(require("format-json"));

var _reactTextareaAutosize = _interopRequireDefault(require("react-textarea-autosize"));

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

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var StyledTextarea = (0, _theming.styled)(function (_ref) {
  var shown = _ref.shown,
      failed = _ref.failed,
      rest = _objectWithoutProperties(_ref, ["shown", "failed"]);

  return _react["default"].createElement(_reactTextareaAutosize["default"], rest);
})({
  flex: '1 0 0',
  boxSizing: 'border-box',
  margin: '0 0 0 5px',
  verticalAlign: 'top',
  outline: 'none',
  border: '1px solid #c7c7c7',
  borderRadius: 2,
  fontSize: 13,
  padding: '8px 5px 7px 8px',
  color: 'rgb(51, 51, 51)',
  fontFamily: 'Arial, sans-serif',
  minHeight: '32px',
  resize: 'vertical'
}, function (_ref2) {
  var shown = _ref2.shown;
  return shown ? {} : {
    display: 'none'
  };
}, function (_ref3) {
  var failed = _ref3.failed;
  return failed ? {
    border: '1px solid #fadddd',
    backgroundColor: '#fff5f5'
  } : {};
});

var Button = _theming.styled.button({
  display: 'table-cell',
  textTransform: 'uppercase',
  letterSpacing: '3.5px',
  fontSize: 12,
  fontWeight: 'bolder',
  color: 'rgb(130, 130, 130)',
  border: '1px solid rgb(193, 193, 193)',
  textAlign: 'center',
  borderRadius: 2,
  padding: 5,
  cursor: 'pointer',
  paddingLeft: 8,
  margin: '0 0 0 5px',
  backgroundColor: 'inherit',
  verticalAlign: 'top',
  outline: 0
});

var Label = _theming.styled.label({
  display: 'table-cell',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  paddingRight: 5,
  paddingTop: 7,
  textAlign: 'right',
  width: 100,
  fontWeight: '600'
});

var Wrapper = _theming.styled.div({
  display: 'flex',
  padding: 5,
  alignItems: 'flex-start',
  boxSizing: 'border-box',
  width: '100%'
});

function getJSONFromString(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

var Item =
/*#__PURE__*/
function (_Component) {
  _inherits(Item, _Component);

  function Item() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Item);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Item)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      isTextAreaShowed: false,
      failed: false,
      payload: null,
      payloadString: '',
      prevPayload: null
    };

    _this.onChange = function (_ref4) {
      var value = _ref4.target.value;
      var newState = {
        payloadString: value
      };

      try {
        newState.payload = JSON.parse(value.trim());
        newState.failed = false;
      } catch (err) {
        newState.failed = true;
      }

      _this.setState(function (state) {
        return Object.assign({}, state, {}, newState);
      });
    };

    _this.onEmitClick = function () {
      var _this$props = _this.props,
          onEmit = _this$props.onEmit,
          name = _this$props.name;
      var payload = _this.state.payload;
      onEmit({
        name: name,
        payload: payload
      });
    };

    _this.onToggleEditClick = function () {
      _this.setState(function (_ref5) {
        var isTextAreaShowed = _ref5.isTextAreaShowed;
        return {
          isTextAreaShowed: !isTextAreaShowed
        };
      });
    };

    return _this;
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          title = _this$props2.title,
          name = _this$props2.name;
      var _this$state = this.state,
          failed = _this$state.failed,
          isTextAreaShowed = _this$state.isTextAreaShowed,
          payloadString = _this$state.payloadString;
      return _react["default"].createElement(Wrapper, null, _react["default"].createElement(Label, {
        htmlFor: "addon-event-".concat(name)
      }, title), _react["default"].createElement(Button, {
        onClick: this.onEmitClick,
        disabled: failed,
        title: "Submit event"
      }, _react["default"].createElement("span", {
        role: "img",
        "aria-label": "emit"
      }, "\uD83D\uDCE2")), _react["default"].createElement(StyledTextarea, {
        shown: isTextAreaShowed,
        failed: failed,
        value: payloadString,
        onChange: this.onChange
      }), isTextAreaShowed ? _react["default"].createElement(Button, {
        onClick: this.onToggleEditClick,
        title: "Close editing"
      }, _react["default"].createElement("span", {
        role: "img",
        "aria-label": "close"
      }, "\u274C")) : _react["default"].createElement(Button, {
        onClick: this.onToggleEditClick,
        title: "Edit event payload"
      }, _react["default"].createElement("span", {
        role: "img",
        "aria-label": "edit"
      }, "\u270F\uFE0F")));
    }
  }]);

  return Item;
}(_react.Component);

Item.propTypes = {
  name: _propTypes["default"].string.isRequired,
  title: _propTypes["default"].string.isRequired,
  onEmit: _propTypes["default"].func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
  payload: _propTypes["default"].any
};
Item.defaultProps = {
  payload: {}
};

Item.getDerivedStateFromProps = function (_ref6, _ref7) {
  var payload = _ref6.payload;
  var prevPayload = _ref7.prevPayload;

  if (!(0, _isEqual["default"])(payload, prevPayload)) {
    var payloadString = _formatJson["default"].plain(payload);

    var refinedPayload = getJSONFromString(payloadString);
    return {
      failed: false,
      payload: refinedPayload,
      payloadString: payloadString,
      prevPayload: refinedPayload
    };
  }

  return null;
};

(0, _reactLifecyclesCompat.polyfill)(Item);
var _default = Item;
exports["default"] = _default;