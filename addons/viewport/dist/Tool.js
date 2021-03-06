"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.bold");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewportTool = void 0;

var _react = _interopRequireWildcard(require("react"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _api = require("@storybook/api");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var toList = (0, _memoizerific["default"])(50)(function (items) {
  return [].concat(baseViewports, _toConsumableArray(Object.entries(items).map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
        id = _ref3[0],
        _ref = _ref3[1];

    var name = _ref.name,
        rest = _objectWithoutProperties(_ref, ["name"]);

    return Object.assign({}, rest, {
      id: id,
      title: name
    });
  })));
});
var responsiveViewport = {
  id: 'reset',
  title: 'Reset viewport',
  styles: null,
  type: 'other'
};
var baseViewports = [responsiveViewport];
var toLinks = (0, _memoizerific["default"])(50)(function (list, active, set, state, close) {
  return list.map(function (i) {
    switch (i.id) {
      case responsiveViewport.id:
        {
          if (active.id === i.id) {
            return null;
          }
        }

      default:
        {
          return Object.assign({}, i, {
            onClick: function onClick() {
              set(Object.assign({}, state, {
                selected: i.id
              }));
              close();
            }
          });
        }
    }
  }).filter(Boolean);
});
var iframeId = 'storybook-preview-iframe';
var wrapperId = 'storybook-preview-wrapper';

var flip = function flip(_ref4) {
  var width = _ref4.width,
      height = _ref4.height;
  return {
    height: width,
    width: height
  };
};

var ActiveViewportSize = _theming.styled.div(function () {
  return {
    display: 'inline-flex'
  };
});

var ActiveViewportLabel = _theming.styled.div(function (_ref5) {
  var theme = _ref5.theme;
  return {
    display: 'inline-block',
    textDecoration: 'none',
    padding: '10px',
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: 1,
    height: 40,
    border: 'none',
    borderTop: '3px solid transparent',
    borderBottom: '3px solid transparent',
    background: 'transparent'
  };
});

var IconButtonWithLabel = (0, _theming.styled)(_components.IconButton)(function () {
  return {
    display: 'inline-flex',
    alignItems: 'center'
  };
});

var IconButtonLabel = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    fontSize: theme.typography.size.s2 - 1,
    marginLeft: '10px'
  };
});

var getStyles = function getStyles(prevStyles, styles, isRotated) {
  if (styles === null) {
    return null;
  }

  var result = typeof styles === 'function' ? styles(prevStyles) : styles;
  return isRotated ? flip(result) : result;
};

var ViewportTool = _react["default"].memo((0, _theming.withTheme)(function (_ref7) {
  var _ref9;

  var theme = _ref7.theme;

  var _useParameter = (0, _api.useParameter)(_constants.PARAM_KEY, {
    viewports: {},
    defaultViewport: responsiveViewport.id
  }),
      viewports = _useParameter.viewports,
      defaultViewport = _useParameter.defaultViewport,
      disable = _useParameter.disable;

  var _useAddonState = (0, _api.useAddonState)(_constants.ADDON_ID, {
    selected: defaultViewport || responsiveViewport.id,
    isRotated: false
  }),
      _useAddonState2 = _slicedToArray(_useAddonState, 2),
      state = _useAddonState2[0],
      setState = _useAddonState2[1];

  var list = toList(viewports);
  var selected = state.selected,
      isRotated = state.isRotated;
  var item = list.find(function (i) {
    return i.id === selected;
  }) || list.find(function (i) {
    return i.id === defaultViewport;
  }) || list.find(function (i) {
    return i["default"];
  }) || responsiveViewport;
  var ref = (0, _react.useRef)();
  var styles = getStyles(ref.current, item.styles, isRotated);
  (0, _react.useEffect)(function () {
    ref.current = styles;
  }, [item]);

  if (disable || Object.entries(viewports).length === 0) {
    return null;
  }

  return _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: function tooltip(_ref8) {
      var onHide = _ref8.onHide;
      return _react["default"].createElement(_components.TooltipLinkList, {
        links: toLinks(list, item, setState, state, onHide)
      });
    },
    closeOnClick: true
  }, _react["default"].createElement(IconButtonWithLabel, {
    key: "viewport",
    title: "Change the size of the preview",
    active: !!styles,
    onDoubleClick: function onDoubleClick() {
      setState(Object.assign({}, state, {
        selected: responsiveViewport.id
      }));
    }
  }, _react["default"].createElement(_components.Icons, {
    icon: "grow"
  }), styles ? _react["default"].createElement(IconButtonLabel, null, isRotated ? "".concat(item.title, " (L)") : "".concat(item.title, " (P)")) : null)), styles ? _react["default"].createElement(ActiveViewportSize, null, _react["default"].createElement(_theming.Global, {
    styles: (_ref9 = {}, _defineProperty(_ref9, "#".concat(iframeId), Object.assign({
      margin: "auto",
      transition: 'width .3s, height .3s',
      position: 'relative',
      border: "".concat(theme.layoutMargin, "px solid black"),
      borderRadius: theme.appBorderRadius,
      boxShadow: '0 0 100px 1000px rgba(0,0,0,0.5), 0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)'
    }, styles)), _defineProperty(_ref9, "#".concat(wrapperId), {
      padding: theme.layoutMargin,
      display: 'flex',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      justifyItems: 'center',
      overflow: 'auto'
    }), _ref9)
  }), _react["default"].createElement(ActiveViewportLabel, {
    title: "Viewport width"
  }, styles.width.replace('px', '')), _react["default"].createElement(_components.IconButton, {
    key: "viewport-rotate",
    title: "Rotate viewport",
    onClick: function onClick() {
      setState(Object.assign({}, state, {
        isRotated: !isRotated
      }));
    }
  }, _react["default"].createElement(_components.Icons, {
    icon: "transfer"
  })), _react["default"].createElement(ActiveViewportLabel, {
    title: "Viewport height"
  }, styles.height.replace('px', ''))) : null);
}));

exports.ViewportTool = ViewportTool;