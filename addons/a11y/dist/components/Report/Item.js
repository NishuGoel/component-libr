"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _Info = require("./Info");

var _Elements = require("./Elements");

var _Tags = require("./Tags");

var _HighlightToggle = _interopRequireDefault(require("./HighlightToggle"));

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

var Wrapper = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'flex',
    width: '100%',
    borderBottom: "1px solid ".concat(theme.appBorderColor),
    '&:hover': {
      background: theme.background.hoverable
    }
  };
});

var Icon = (0, _theming.styled)(_components.Icons)(function (_ref2) {
  var theme = _ref2.theme;
  return {
    height: 10,
    width: 10,
    minWidth: 10,
    color: theme.color.mediumdark,
    marginRight: '10px',
    transition: 'transform 0.1s ease-in-out',
    alignSelf: 'center',
    display: 'inline-flex'
  };
});

var HeaderBar = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    padding: theme.layoutMargin,
    paddingLeft: theme.layoutMargin - 3,
    background: 'none',
    color: 'inherit',
    textAlign: 'left',
    cursor: 'pointer',
    borderLeft: '3px solid transparent',
    width: '100%',
    '&:focus': {
      outline: '0 none',
      borderLeft: "3px solid ".concat(theme.color.secondary)
    }
  };
});

var HighlightToggleElement = _theming.styled.span({
  fontWeight: 'normal',
  "float": 'right',
  marginRight: '15px',
  alignSelf: 'center',
  input: {
    margin: 0
  }
});

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
      open: false
    };

    _this.onToggle = function () {
      return _this.setState(function (prevState) {
        return {
          open: !prevState.open
        };
      });
    };

    return _this;
  }

  _createClass(Item, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          item = _this$props.item,
          type = _this$props.type;
      var open = this.state.open;
      var highlightToggleId = "".concat(type, "-").concat(item.id);
      return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Wrapper, null, _react["default"].createElement(HeaderBar, {
        onClick: this.onToggle,
        role: "button"
      }, _react["default"].createElement(Icon, {
        icon: "chevrondown",
        size: 10,
        color: "#9DA5AB",
        style: {
          transform: "rotate(".concat(open ? 0 : -90, "deg)")
        }
      }), item.description), _react["default"].createElement(HighlightToggleElement, null, _react["default"].createElement(_HighlightToggle["default"], {
        toggleId: highlightToggleId,
        type: type,
        elementsToHighlight: item ? item.nodes : null
      }))), open ? _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_Info.Info, {
        item: item,
        key: "info"
      }), _react["default"].createElement(_Elements.Elements, {
        elements: item.nodes,
        type: type,
        key: "elements"
      }), _react["default"].createElement(_Tags.Tags, {
        tags: item.tags,
        key: "tags"
      })) : null);
    }
  }]);

  return Item;
}(_react.Component);

exports.Item = Item;