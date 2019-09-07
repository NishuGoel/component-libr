"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _deepEqual = _interopRequireDefault(require("deep-equal"));

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

var styles = {
  borderWidth: 1,
  borderColor: '#f7f4f4',
  borderRadius: 2,
  fontSize: 13,
  padding: 5,
  margin: 10,
  color: '#555'
};

var ObjectType =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ObjectType, _React$Component);

  function ObjectType() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ObjectType);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ObjectType)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.handleChange = function (value) {
      var onChange = _this.props.onChange;
      var newState = {
        jsonString: value
      };

      try {
        newState.json = JSON.parse(value.trim());
        onChange(newState.json);
        _this.failed = false;
      } catch (err) {
        _this.failed = true;
      }

      _this.setState(newState);
    };

    _this.state = {};
    return _this;
  }

  _createClass(ObjectType, [{
    key: "getJSONString",
    value: function getJSONString() {
      var _this$state = this.state,
          json = _this$state.json,
          jsonString = _this$state.jsonString;
      var knob = this.props.knob; // If there is an error in the JSON, we need to give that errored JSON.

      if (this.failed) return jsonString; // If the editor value and the knob value is the same, we need to return the
      // editor value as it allow user to add new fields to the JSON.

      if ((0, _deepEqual["default"])(json, knob.value)) return jsonString; // If the knob's value is different from the editor, it seems like
      // there's a outside change and we need to get that.

      return JSON.stringify(knob.value, null, 2);
    }
  }, {
    key: "render",
    value: function render() {
      var knob = this.props.knob;
      var jsonString = this.getJSONString();
      var extraStyle = {};

      if (this.failed) {
        extraStyle.borderWidth = 1;
        extraStyle.borderColor = '#fadddd';
        extraStyle.backgroundColor = '#fff5f5';
      }

      return _react["default"].createElement(_reactNative.TextInput, {
        id: knob.name,
        style: Object.assign({}, styles, {}, extraStyle),
        value: jsonString,
        onChangeText: this.handleChange,
        multiline: true,
        underlineColorAndroid: "transparent"
      });
    }
  }]);

  return ObjectType;
}(_react["default"].Component);

ObjectType.defaultProps = {
  knob: {},
  onChange: function onChange(value) {
    return value;
  }
};
ObjectType.propTypes = {
  knob: _propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array])
  }),
  onChange: _propTypes["default"].func
};

ObjectType.serialize = function (object) {
  return JSON.stringify(object);
};

ObjectType.deserialize = function (value) {
  return value ? JSON.parse(value) : {};
};

var _default = ObjectType;
exports["default"] = _default;