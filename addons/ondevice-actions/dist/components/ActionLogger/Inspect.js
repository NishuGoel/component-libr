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

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.flags");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var theme = {
  OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
  OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
  OBJECT_NAME_COLOR: 'rgb(136, 19, 145)',
  OBJECT_VALUE_NULL_COLOR: 'rgb(128, 128, 128)',
  OBJECT_VALUE_UNDEFINED_COLOR: 'rgb(128, 128, 128)',
  OBJECT_VALUE_REGEXP_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_STRING_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_SYMBOL_COLOR: 'rgb(196, 26, 22)',
  OBJECT_VALUE_NUMBER_COLOR: 'rgb(28, 0, 207)',
  OBJECT_VALUE_BOOLEAN_COLOR: 'rgb(28, 0, 207)',
  OBJECT_VALUE_FUNCTION_PREFIX_COLOR: 'rgb(13, 34, 170)',
  ARROW_COLOR: '#6e6e6e',
  ARROW_MARGIN_RIGHT: 3,
  ARROW_FONT_SIZE: 12,
  ARROW_ANIMATION_DURATION: '0'
};

var Inspect =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Inspect, _React$Component);

  function Inspect() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Inspect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Inspect)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.state = {
      expanded: false
    };
    return _this;
  }

  _createClass(Inspect, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          name = _this$props.name,
          value = _this$props.value;
      var expanded = this.state.expanded;

      var toggle = _react["default"].createElement(_reactNative.View, {
        style: {
          width: 40,
          height: 40
        }
      }, name && (Array.isArray(value) && value.length || value && _typeof(value) === 'object' && !Array.isArray(value) && Object.keys(value).length) ? _react["default"].createElement(_reactNative.Button, {
        onPress: function onPress() {
          return _this2.setState(function (s) {
            return {
              expanded: !s.expanded
            };
          });
        },
        title: !expanded ? '▶' : '▼'
      }) : null);

      var nameComponent = name ? _react["default"].createElement(_reactNative.Text, {
        style: {
          color: theme.OBJECT_NAME_COLOR
        }
      }, name) : null;

      if (Array.isArray(value)) {
        if (name) {
          return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }, toggle, nameComponent, _react["default"].createElement(_reactNative.Text, null, ": ".concat(value.length === 0 ? '[]' : expanded ? '[' : '[...]'))), expanded ? _react["default"].createElement(_reactNative.View, {
            style: {
              marginLeft: 40
            }
          }, value.map(function (v, i) {
            return _react["default"].createElement(_reactNative.View, {
              key: i,
              style: {
                marginLeft: 40
              }
            }, _react["default"].createElement(Inspect, {
              value: v
            }));
          }), _react["default"].createElement(_reactNative.View, {
            style: {
              marginLeft: 20
            }
          }, _react["default"].createElement(_reactNative.Text, null, "]"))) : null);
        }

        return _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_reactNative.Text, null, "["), value.map(function (v, i) {
          return _react["default"].createElement(_reactNative.View, {
            key: i,
            style: {
              marginLeft: 20
            }
          }, _react["default"].createElement(Inspect, {
            value: v
          }));
        }), _react["default"].createElement(_reactNative.Text, null, "]"));
      }

      if (value && _typeof(value) === 'object' && !(value instanceof RegExp)) {
        if (name) {
          return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(_reactNative.View, {
            style: {
              flexDirection: 'row',
              alignItems: 'center'
            }
          }, toggle, nameComponent, _react["default"].createElement(_reactNative.Text, null, ": ".concat(Object.keys(value).length === 0 ? '{}' : expanded ? '{' : '{...}'))), expanded ? _react["default"].createElement(_reactNative.View, {
            style: {
              marginLeft: 40
            }
          }, Object.entries(value).map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                v = _ref2[1];

            return _react["default"].createElement(_reactNative.View, {
              key: key
            }, _react["default"].createElement(Inspect, {
              name: key,
              value: v
            }));
          }), _react["default"].createElement(_reactNative.View, {
            style: {
              marginLeft: 20
            }
          }, _react["default"].createElement(_reactNative.Text, null, '}'))) : null);
        }

        return _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(_reactNative.Text, null, '{'), Object.entries(value).map(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              key = _ref4[0],
              v = _ref4[1];

          return _react["default"].createElement(_reactNative.View, {
            key: key
          }, _react["default"].createElement(Inspect, {
            name: key,
            value: v
          }));
        }), _react["default"].createElement(_reactNative.Text, null, '}'));
      }

      if (name) {
        return _react["default"].createElement(_reactNative.View, {
          style: {
            flexDirection: 'row',
            alignItems: 'center'
          }
        }, toggle, nameComponent, _react["default"].createElement(_reactNative.Text, null, ": "), _react["default"].createElement(Value, {
          value: value
        }));
      }

      return _react["default"].createElement(_reactNative.View, null, _react["default"].createElement(Value, {
        value: value
      }));
    }
  }]);

  return Inspect;
}(_react["default"].Component);

function Value(_ref5) {
  var value = _ref5.value;

  if (value === null) {
    return _react["default"].createElement(_reactNative.Text, {
      style: {
        color: theme.OBJECT_VALUE_NULL_COLOR
      }
    }, "null");
  }

  if (value === undefined) {
    return _react["default"].createElement(_reactNative.Text, {
      style: {
        color: theme.OBJECT_VALUE_UNDEFINED_COLOR
      }
    }, "undefined");
  }

  if (value instanceof RegExp) {
    return _react["default"].createElement(_reactNative.Text, {
      style: {
        color: theme.OBJECT_VALUE_REGEXP_COLOR
      }
    }, "/".concat(value.source, "/").concat(value.flags));
  }

  switch (_typeof(value)) {
    case 'string':
      return _react["default"].createElement(_reactNative.Text, {
        style: {
          color: theme.OBJECT_VALUE_STRING_COLOR
        }
      }, JSON.stringify(value));

    case 'number':
      return _react["default"].createElement(_reactNative.Text, {
        style: {
          color: theme.OBJECT_VALUE_NUMBER_COLOR
        }
      }, JSON.stringify(value));

    case 'boolean':
      return _react["default"].createElement(_reactNative.Text, {
        style: {
          color: theme.OBJECT_VALUE_BOOLEAN_COLOR
        }
      }, JSON.stringify(value));

    case 'function':
      return _react["default"].createElement(_reactNative.Text, {
        style: {
          color: theme.OBJECT_VALUE_FUNCTION_PREFIX_COLOR
        }
      }, "[Function]");

    default:
      return _react["default"].createElement(_reactNative.Text, null, JSON.stringify(value));
  }
}

var _default = Inspect;
exports["default"] = _default;