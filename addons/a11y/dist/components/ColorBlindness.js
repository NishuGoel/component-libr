"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColorBlindness = void 0;

var _global = require("global");

var _react = _interopRequireWildcard(require("react"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _theming = require("@storybook/theming");

var _clientLogger = require("@storybook/client-logger");

var _components = require("@storybook/components");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var getIframe = (0, _memoizerific["default"])(1)(function () {
  return _global.document.getElementById('storybook-preview-iframe');
});

var getFilter = function getFilter(filter) {
  if (filter === null) {
    return 'none';
  }

  if (filter === 'mono') {
    return 'grayscale(100%)';
  }

  return "url('#".concat(filter, "')");
};

var ColorIcon = _theming.styled.span({
  background: 'linear-gradient(to right, #F44336, #FF9800, #FFEB3B, #8BC34A, #2196F3, #9C27B0)',
  borderRadius: '1rem',
  display: 'block',
  height: '1rem',
  width: '1rem'
}, function (_ref) {
  var filter = _ref.filter;
  return {
    filter: getFilter(filter)
  };
}, function (_ref2) {
  var theme = _ref2.theme;
  return {
    boxShadow: "".concat(theme.appBorderColor, " 0 0 0 1px inset")
  };
}); // eslint-disable-next-line @typescript-eslint/no-empty-interface


var baseList = ['protanopia', 'protanomaly', 'deuteranopia', 'deuteranomaly', 'tritanopia', 'tritanomaly', 'achromatopsia', 'achromatomaly', 'mono'];

var getColorList = function getColorList(active, set) {
  return [].concat(_toConsumableArray(active !== null ? [{
    id: 'reset',
    title: 'Reset color filter',
    onClick: function onClick() {
      set(null);
    },
    right: undefined,
    active: false
  }] : []), _toConsumableArray(baseList.map(function (i) {
    return {
      id: i,
      title: i.charAt(0).toUpperCase() + i.slice(1),
      onClick: function onClick() {
        set(i);
      },
      right: _react["default"].createElement(ColorIcon, {
        filter: i
      }),
      active: active === i
    };
  })));
};

var ColorBlindness =
/*#__PURE__*/
function (_Component) {
  _inherits(ColorBlindness, _Component);

  function ColorBlindness() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ColorBlindness);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ColorBlindness)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      active: null
    };

    _this.setActive = function (active) {
      var iframe = getIframe();

      if (iframe) {
        iframe.style.filter = getFilter(active);

        _this.setState({
          active: active
        });
      } else {
        _clientLogger.logger.error('Cannot find Storybook iframe');
      }
    };

    return _this;
  }

  _createClass(ColorBlindness, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var active = this.state.active;
      return _react["default"].createElement(_components.WithTooltip, {
        placement: "top",
        trigger: "click",
        tooltip: function tooltip(_ref3) {
          var onHide = _ref3.onHide;
          var colorList = getColorList(active, function (i) {
            _this2.setActive(i);

            onHide();
          });
          return _react["default"].createElement(_components.TooltipLinkList, {
            links: colorList
          });
        },
        closeOnClick: true,
        onDoubleClick: function onDoubleClick() {
          return _this2.setActive(null);
        }
      }, _react["default"].createElement(_components.IconButton, {
        key: "filter",
        active: !!active,
        title: "Color Blindness Emulation"
      }, _react["default"].createElement(_components.Icons, {
        icon: "mirror"
      })));
    }
  }]);

  return ColorBlindness;
}(_react.Component);

exports.ColorBlindness = ColorBlindness;