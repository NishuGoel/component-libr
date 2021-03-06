"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PureSidebarSearch = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var FilterField = _theming.styled.input(function (_ref) {
  var theme = _ref.theme;
  return {
    // resets
    appearance: 'none',
    border: 'none',
    boxSizing: 'inherit',
    display: ' block',
    outline: 'none',
    width: ' 100%',
    margin: ' 0',
    background: 'transparent',
    padding: 0,
    fontSize: 'inherit',
    '&:-webkit-autofill': {
      WebkitBoxShadow: "0 0 0 3em ".concat(theme.color.lightest, " inset")
    },
    '::placeholder': {
      color: theme.color.mediumdark
    },
    '&:placeholder-shown ~ button': {
      // hide cancel button using CSS only
      opacity: 0
    }
  };
});

var CancelButton = _theming.styled.button(function (_ref2) {
  var theme = _ref2.theme;
  return {
    border: 0,
    margin: 0,
    padding: 4,
    textDecoration: 'none',
    background: theme.appBorderColor,
    borderRadius: '1em',
    cursor: 'pointer',
    opacity: 1,
    transition: 'all 150ms ease-out',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: 2,
    '> svg': {
      display: 'block',
      height: 8,
      width: 8,
      color: theme.input.color,
      transition: 'all 150ms ease-out'
    },
    '&:hover': {
      background: (0, _polished.opacify)(0.1, theme.appBorderColor)
    }
  };
});

var FilterForm = _theming.styled.form(function (_ref3) {
  var theme = _ref3.theme,
      focussed = _ref3.focussed;
  return {
    transition: 'all 150ms ease-out',
    borderBottom: '1px solid transparent',
    borderBottomColor: focussed ? (0, _polished.opacify)(0.3, theme.appBorderColor) : (0, _polished.opacify)(0.1, theme.appBorderColor),
    outline: 0,
    position: 'relative',
    input: {
      color: theme.input.color,
      fontSize: theme.typography.size.s2 - 1,
      lineHeight: '20px',
      paddingTop: '2px',
      paddingBottom: '2px',
      paddingLeft: '20px'
    },
    '> svg': {
      transition: 'all 150ms ease-out',
      position: 'absolute',
      top: '50%',
      height: '12px',
      width: '12px',
      transform: 'translateY(-50%)',
      zIndex: '1',
      background: 'transparent',
      path: {
        transition: 'all 150ms ease-out',
        fill: 'currentColor',
        opacity: focussed ? 1 : 0.3
      }
    }
  };
});

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_components.Icons, {
  icon: "search"
});

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(CancelButton, {
  type: "reset",
  value: "reset",
  title: "Clear search"
}, _react["default"].createElement(_components.Icons, {
  icon: "closeAlt"
}));

var PureSidebarSearch = function PureSidebarSearch(_ref4) {
  var className = _ref4.className,
      _onChange = _ref4.onChange,
      props = _objectWithoutProperties(_ref4, ["className", "onChange"]);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      focussed = _useState2[0],
      onSetFocussed = _useState2[1];

  return _react["default"].createElement(FilterForm, {
    autoComplete: "off",
    focussed: focussed,
    className: className,
    onReset: function onReset() {
      return _onChange('');
    }
  }, _react["default"].createElement(FilterField, _extends({
    type: "text",
    autocomplete: "off",
    id: "storybook-explorer-searchfield",
    onFocus: function onFocus() {
      return onSetFocussed(true);
    },
    onBlur: function onBlur() {
      return onSetFocussed(false);
    },
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    }
  }, props, {
    placeholder: focussed ? 'Type to search...' : 'Press "/" to search...',
    "aria-label": "Search stories"
  })), _ref5, _ref6);
};

exports.PureSidebarSearch = PureSidebarSearch;
PureSidebarSearch.displayName = "PureSidebarSearch";
PureSidebarSearch.propTypes = {
  className: _propTypes["default"].string,
  onChange: _propTypes["default"].func.isRequired
};
PureSidebarSearch.defaultProps = {
  className: null
};
var _default = PureSidebarSearch;
exports["default"] = _default;