"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preview = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _BlockBackgroundStyles = require("./BlockBackgroundStyles");

var _Source = require("./Source");

var _ActionBar = require("../ActionBar/ActionBar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ChildrenContainer = _theming.styled.div(function (_ref) {
  var isColumn = _ref.isColumn,
      columns = _ref.columns;
  return {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: isColumn ? 'column' : 'row',
    marginTop: -20,
    '> *': {
      flex: columns ? "1 1 calc(100%/".concat(columns, " - 20px)") : "1 1 0%",
      marginRight: 20,
      marginTop: 20
    }
  };
});

var StyledSource = (0, _theming.styled)(_Source.Source)(function (_ref2) {
  var theme = _ref2.theme;
  return {
    margin: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    border: 'none',
    background: theme.base === 'light' ? 'rgba(0, 0, 0, 0.85)' : (0, _polished.darken)(0.05, theme.background.content),
    color: theme.color.lightest,
    button: {
      background: theme.base === 'light' ? 'rgba(0, 0, 0, 0.85)' : (0, _polished.darken)(0.05, theme.background.content)
    }
  };
});

var PreviewWrapper = _theming.styled.div(function (_ref3) {
  var theme = _ref3.theme,
      withSource = _ref3.withSource;
  return Object.assign({}, (0, _BlockBackgroundStyles.getBlockBackgroundStyle)(theme), {
    padding: '30px 20px',
    position: 'relative',
    borderBottomLeftRadius: withSource && 0,
    borderBottomRightRadius: withSource && 0
  });
});

var PreviewContainer = _theming.styled.div({
  margin: '25px 0 40px'
});
/**
 * A preview component for showing one or more component `Story`
 * items. The preview also shows the source for the componnent
 * as a drop-down.
 */


var Preview = function Preview(_ref4) {
  var isColumn = _ref4.isColumn,
      columns = _ref4.columns,
      children = _ref4.children,
      withSource = _ref4.withSource,
      _ref4$isExpanded = _ref4.isExpanded,
      isExpanded = _ref4$isExpanded === void 0 ? false : _ref4$isExpanded,
      props = _objectWithoutProperties(_ref4, ["isColumn", "columns", "children", "withSource", "isExpanded"]);

  var _React$useState = _react["default"].useState(isExpanded),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      expanded = _React$useState2[0],
      setExpanded = _React$useState2[1];

  var _ref5 = expanded ? {
    source: _react["default"].createElement(StyledSource, _extends({}, withSource, {
      dark: true
    })),
    actionItem: {
      title: 'Hide code',
      onClick: function onClick() {
        return setExpanded(false);
      }
    }
  } : {
    source: null,
    actionItem: {
      title: 'Show code',
      onClick: function onClick() {
        return setExpanded(true);
      }
    }
  },
      source = _ref5.source,
      actionItem = _ref5.actionItem;

  return _react["default"].createElement(PreviewContainer, props, _react["default"].createElement(PreviewWrapper, {
    withSource: withSource
  }, _react["default"].createElement(ChildrenContainer, {
    isColumn: isColumn,
    columns: columns
  }, Array.isArray(children) ? children.map(function (child, i) {
    return _react["default"].createElement("div", {
      key: i.toString()
    }, child);
  }) : _react["default"].createElement("div", null, children)), withSource && _react["default"].createElement(_ActionBar.ActionBar, {
    actionItems: [actionItem]
  })), withSource && source);
};

exports.Preview = Preview;
Preview.displayName = "Preview";