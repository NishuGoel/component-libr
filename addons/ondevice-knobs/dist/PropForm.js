"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

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

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactNative = require("react-native");

var _PropField = _interopRequireDefault(require("./PropField"));

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

var PropForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PropForm, _React$Component);

  function PropForm() {
    _classCallCheck(this, PropForm);

    return _possibleConstructorReturn(this, _getPrototypeOf(PropForm).apply(this, arguments));
  }

  _createClass(PropForm, [{
    key: "makeChangeHandler",
    value: function makeChangeHandler(name, type) {
      var _this = this;

      return function (value) {
        var onFieldChange = _this.props.onFieldChange;
        var change = {
          name: name,
          type: type,
          value: value
        };
        onFieldChange(change);
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          knobs = _this$props.knobs,
          onFieldClick = _this$props.onFieldClick;
      return _react["default"].createElement(_reactNative.View, null, knobs.map(function (knob) {
        var changeHandler = _this2.makeChangeHandler(knob.name, knob.type);

        return _react["default"].createElement(_PropField["default"], {
          key: knob.name,
          name: knob.name,
          type: knob.type,
          value: knob.value,
          knob: knob,
          onChange: changeHandler,
          onPress: onFieldClick
        });
      }));
    }
  }]);

  return PropForm;
}(_react["default"].Component);

exports["default"] = PropForm;
PropForm.displayName = 'PropForm';
PropForm.defaultProps = {
  knobs: []
};
PropForm.propTypes = {
  knobs: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    name: _propTypes["default"].string,
    value: _propTypes["default"].any
  })),
  onFieldChange: _propTypes["default"].func.isRequired,
  onFieldClick: _propTypes["default"].func.isRequired
};