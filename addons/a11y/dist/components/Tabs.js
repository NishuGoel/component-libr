"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.parse-int");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.bold");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _reactSizeme = require("react-sizeme");

var _reduxConfig = _interopRequireWildcard(require("../redux-config"));

var _HighlightToggle = _interopRequireDefault(require("./Report/HighlightToggle"));

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

// TODO: reuse the Tabs component from @storybook/theming instead of re-building identical functionality
var Container = _theming.styled.div({
  width: '100%',
  position: 'relative',
  minHeight: '100%'
});

var HighlightToggleLabel = _theming.styled.label(function (_ref) {
  var theme = _ref.theme;
  return {
    cursor: 'pointer',
    userSelect: 'none',
    marginBottom: '3px',
    marginRight: '3px',
    color: theme.color.dark
  };
});

var GlobalToggle = _theming.styled.div(function (_ref2) {
  var elementWidth = _ref2.elementWidth;
  var maxWidthBeforeBreak = 450;
  return {
    cursor: 'pointer',
    fontSize: '14px',
    padding: elementWidth > maxWidthBeforeBreak ? '12px 15px 10px 0' : '12px 0px 3px 12px',
    height: '40px',
    border: 'none',
    marginTop: elementWidth > maxWidthBeforeBreak ? '-40px' : '0px',
    "float": elementWidth > maxWidthBeforeBreak ? 'right' : 'left',
    display: elementWidth > maxWidthBeforeBreak ? 'flex' : 'block',
    alignItems: 'center',
    width: elementWidth > maxWidthBeforeBreak ? 'auto' : '100%',
    borderBottom: elementWidth > maxWidthBeforeBreak ? 'none' : '1px solid rgba(0,0,0,.1)',
    input: {
      marginLeft: '10',
      marginRight: '0',
      marginTop: '0',
      marginBottom: '0'
    }
  };
});

var Item = _theming.styled.button(function (_ref3) {
  var theme = _ref3.theme;
  return {
    textDecoration: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: 1,
    height: 40,
    border: 'none',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    background: 'transparent',
    '&:focus': {
      outline: '0 none',
      borderBottom: "3px solid ".concat(theme.color.secondary)
    }
  };
}, function (_ref4) {
  var active = _ref4.active,
      theme = _ref4.theme;
  return active ? {
    opacity: 1,
    borderBottom: "3px solid ".concat(theme.color.secondary)
  } : {};
});

var TabsWrapper = _theming.styled.div({});

var List = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return {
    boxShadow: "".concat(theme.appBorderColor, " 0 -1px 0 0 inset"),
    background: 'rgba(0, 0, 0, .05)',
    display: 'flex',
    justifyContent: 'space-between',
    whiteSpace: 'nowrap'
  };
});

function retrieveAllNodesFromResults(items) {
  return items.reduce(function (acc, item) {
    return acc.concat(item.nodes);
  }, []);
}

var Tabs =
/*#__PURE__*/
function (_Component) {
  _inherits(Tabs, _Component);

  function Tabs() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tabs);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tabs)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      active: 0
    };

    _this.onToggle = function (event) {
      _this.setState({
        active: parseInt(event.currentTarget.getAttribute('data-index'), 10)
      }); // removes all elements from the redux map in store from the previous panel


      _reduxConfig["default"].dispatch((0, _reduxConfig.clearElements)());
    };

    return _this;
  }

  _createClass(Tabs, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var tabs = this.props.tabs;
      var active = this.state.active;
      var highlightToggleId = "".concat(tabs[active].type, "-global-checkbox");
      var highlightLabel = "Highlight results";
      return _react["default"].createElement(_reactSizeme.SizeMe, {
        refreshMode: "debounce"
      }, function (_ref6) {
        var size = _ref6.size;
        return _react["default"].createElement(Container, null, _react["default"].createElement(List, null, _react["default"].createElement(TabsWrapper, null, tabs.map(function (tab, index) {
          return _react["default"].createElement(Item
          /* eslint-disable-next-line react/no-array-index-key */
          , {
            key: index,
            "data-index": index,
            active: active === index,
            onClick: _this2.onToggle
          }, tab.label);
        }))), tabs[active].items.length > 0 ? _react["default"].createElement(GlobalToggle, {
          elementWidth: size.width
        }, _react["default"].createElement(HighlightToggleLabel, {
          htmlFor: highlightToggleId
        }, highlightLabel), _react["default"].createElement(_HighlightToggle["default"], {
          toggleId: highlightToggleId,
          type: tabs[active].type,
          elementsToHighlight: retrieveAllNodesFromResults(tabs[active].items),
          label: highlightLabel
        })) : null, tabs[active].panel);
      });
    }
  }]);

  return Tabs;
}(_react.Component);

exports.Tabs = Tabs;