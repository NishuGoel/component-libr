"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.bold");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = SidebarItem;
exports.Item = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _polished = require("polished");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Expander = _theming.styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    display: 'block',
    width: 0,
    height: 0,
    marginRight: 6,
    borderTop: '3.5px solid transparent',
    borderBottom: '3.5px solid transparent',
    borderLeft: "3.5px solid ".concat((0, _polished.opacify)(0.2, theme.appBorderColor)),
    transition: 'transform .1s ease-out'
  };
}, function (_ref2) {
  var isExpandable = _ref2.isExpandable;
  return !isExpandable ? {
    borderLeftColor: 'transparent'
  } : {};
}, function (_ref3) {
  var _ref3$isExpanded = _ref3.isExpanded,
      isExpanded = _ref3$isExpanded === void 0 ? false : _ref3$isExpanded;
  return isExpanded ? {
    transform: 'rotateZ(90deg)'
  } : {};
});

var Icon = (0, _theming.styled)(_components.Icons)({
  flex: 'none',
  width: 10,
  height: 10,
  marginRight: 6
}, function (_ref4) {
  var icon = _ref4.icon;

  if (icon === 'folder') {
    return {
      color: '#774dd7'
    };
  }

  if (icon === 'component') {
    return {
      color: '#1ea7fd'
    };
  }

  if (icon === 'bookmarkhollow') {
    return {
      color: '#37d5d3'
    };
  }

  return {};
}, function (_ref5) {
  var isSelected = _ref5.isSelected;
  return isSelected ? {
    color: 'inherit'
  } : {};
});
var Item = (0, _theming.styled)(function (_ref6) {
  var className = _ref6.className,
      children = _ref6.children,
      id = _ref6.id;
  return _react["default"].createElement("div", {
    className: className,
    id: id
  }, children);
})({
  fontSize: 13,
  lineHeight: '16px',
  paddingTop: 4,
  paddingBottom: 4,
  paddingRight: 20,
  display: 'flex',
  alignItems: 'center',
  flex: 1,
  background: 'transparent'
}, function (_ref7) {
  var depth = _ref7.depth;
  return {
    paddingLeft: depth * 15 + 9
  };
}, function (_ref8) {
  var theme = _ref8.theme,
      isSelected = _ref8.isSelected,
      loading = _ref8.loading;
  return !loading && (isSelected ? {
    cursor: 'default',
    background: theme.color.secondary,
    color: theme.color.lightest,
    fontWeight: theme.typography.weight.bold
  } : {
    cursor: 'pointer',
    color: theme.base === 'light' ? theme.color.defaultText : (0, _polished.transparentize)(0.2, theme.color.defaultText),
    '&:hover': {
      color: theme.color.defaultText,
      background: theme.background.hoverable
    }
  });
}, function (_ref9) {
  var theme = _ref9.theme,
      loading = _ref9.loading;
  return loading && {
    '&& > svg + span': {
      background: theme.color.medium
    },
    '&& > *': theme.animation.inlineGlow,
    '&& > span': {
      borderColor: 'transparent'
    }
  };
});
exports.Item = Item;

function SidebarItem(_ref10) {
  var name = _ref10.name,
      isComponent = _ref10.isComponent,
      isLeaf = _ref10.isLeaf,
      isExpanded = _ref10.isExpanded,
      isSelected = _ref10.isSelected,
      props = _objectWithoutProperties(_ref10, ["name", "isComponent", "isLeaf", "isExpanded", "isSelected"]);

  var iconName;

  if (isLeaf) {
    iconName = 'bookmarkhollow';
  } else if (isComponent) {
    iconName = 'component';
  } else {
    iconName = 'folder';
  }

  return _react["default"].createElement(Item, _extends({
    isSelected: isSelected
  }, props, {
    className: isSelected ? 'sidebar-item selected' : 'sidebar-item'
  }), _react["default"].createElement(Expander, {
    className: "sidebar-expander",
    isExpandable: !isLeaf,
    isExpanded: isExpanded ? true : undefined
  }), _react["default"].createElement(Icon, {
    className: "sidebar-svg-icon",
    icon: iconName,
    isSelected: isSelected
  }), _react["default"].createElement("span", null, name));
}

SidebarItem.displayName = "SidebarItem";
SidebarItem.propTypes = {
  name: _propTypes["default"].node,
  depth: _propTypes["default"].number,
  isComponent: _propTypes["default"].bool,
  isLeaf: _propTypes["default"].bool,
  isExpanded: _propTypes["default"].bool,
  isSelected: _propTypes["default"].bool,
  loading: _propTypes["default"].bool
};
SidebarItem.defaultProps = {
  name: 'loading story',
  depth: 0,
  isComponent: false,
  isLeaf: false,
  isExpanded: false,
  isSelected: false,
  loading: false
};