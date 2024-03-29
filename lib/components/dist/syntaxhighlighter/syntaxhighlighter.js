"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

require("core-js/modules/web.timers");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SyntaxHighlighter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _theming = require("@storybook/theming");

var _global = require("global");

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _jsx = _interopRequireDefault(require("react-syntax-highlighter/languages/prism/jsx"));

var _bash = _interopRequireDefault(require("react-syntax-highlighter/languages/prism/bash"));

var _css = _interopRequireDefault(require("react-syntax-highlighter/languages/prism/css"));

var _markup = _interopRequireDefault(require("react-syntax-highlighter/languages/prism/markup"));

var _prismLight = _interopRequireWildcard(require("react-syntax-highlighter/prism-light"));

var _ActionBar = require("../ActionBar/ActionBar");

var _ScrollArea = require("../ScrollArea/ScrollArea");

var _formatter = require("./formatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(0, _prismLight.registerLanguage)('jsx', _jsx["default"]);
(0, _prismLight.registerLanguage)('bash', _bash["default"]);
(0, _prismLight.registerLanguage)('css', _css["default"]);
(0, _prismLight.registerLanguage)('html', _markup["default"]);
var themedSyntax = (0, _memoizerific["default"])(2)(function (theme) {
  return Object.entries(theme.code || {}).reduce(function (acc, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return Object.assign({}, acc, _defineProperty({}, "* .".concat(key), val));
  }, {});
});

var Wrapper = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme;
  return {
    position: 'relative',
    overflow: 'hidden',
    color: theme.color.defaultText
  };
}, function (_ref4) {
  var theme = _ref4.theme,
      bordered = _ref4.bordered;
  return bordered ? {
    border: "1px solid ".concat(theme.appBorderColor),
    borderRadius: theme.borderRadius,
    background: theme.background.bar
  } : {};
});

var Scroller = (0, _theming.styled)(function (_ref5) {
  var children = _ref5.children,
      className = _ref5.className;
  return _react["default"].createElement(_ScrollArea.ScrollArea, {
    horizontal: true,
    vertical: true,
    className: className
  }, children);
})({
  position: 'relative'
}, function (_ref6) {
  var theme = _ref6.theme;
  return {
    '& code': {
      paddingRight: theme.layoutMargin
    }
  };
}, function (_ref7) {
  var theme = _ref7.theme;
  return themedSyntax(theme);
});

var Pre = _theming.styled.pre(function (_ref8) {
  var theme = _ref8.theme,
      padded = _ref8.padded;
  return {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: 0,
    padding: padded ? theme.layoutMargin : 0
  };
});

var Code = _theming.styled.code({
  flex: 1,
  paddingRight: 0,
  opacity: 1
});

var SyntaxHighlighter =
/*#__PURE__*/
function (_Component) {
  _inherits(SyntaxHighlighter, _Component);

  function SyntaxHighlighter() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, SyntaxHighlighter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(SyntaxHighlighter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      copied: false
    };

    _this.onClick = function (e) {
      var children = _this.props.children;
      e.preventDefault();

      var tmp = _global.document.createElement('TEXTAREA');

      var focus = _global.document.activeElement;
      tmp.value = children;

      _global.document.body.appendChild(tmp);

      tmp.select();

      _global.document.execCommand('copy');

      _global.document.body.removeChild(tmp);

      focus.focus();

      _this.setState({
        copied: true
      }, function () {
        _global.window.setTimeout(function () {
          return _this.setState({
            copied: false
          });
        }, 1500);
      });
    };

    return _this;
  }

  _createClass(SyntaxHighlighter, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          _this$props$language = _this$props.language,
          language = _this$props$language === void 0 ? 'jsx' : _this$props$language,
          copyable = _this$props.copyable,
          bordered = _this$props.bordered,
          padded = _this$props.padded,
          format = _this$props.format,
          className = _this$props.className,
          rest = _objectWithoutProperties(_this$props, ["children", "language", "copyable", "bordered", "padded", "format", "className"]);

      var copied = this.state.copied;
      return children ? _react["default"].createElement(Wrapper, {
        bordered: bordered,
        padded: padded,
        className: className
      }, _react["default"].createElement(Scroller, null, _react["default"].createElement(_prismLight["default"], _extends({
        padded: padded || bordered,
        language: language,
        useInlineStyles: false,
        PreTag: Pre,
        CodeTag: Code,
        lineNumberContainerStyle: {}
      }, rest), format ? (0, _formatter.formatter)(children.trim()) : children.trim())), copyable ? _react["default"].createElement(_ActionBar.ActionBar, {
        actionItems: [{
          title: copied ? 'Copied' : 'Copy',
          onClick: this.onClick
        }]
      }) : null) : null;
    }
  }]);

  return SyntaxHighlighter;
}(_react.Component);

exports.SyntaxHighlighter = SyntaxHighlighter;
SyntaxHighlighter.displayName = "SyntaxHighlighter";
SyntaxHighlighter.defaultProps = {
  language: null,
  copyable: false,
  bordered: false,
  padded: false,
  format: true,
  className: null
};