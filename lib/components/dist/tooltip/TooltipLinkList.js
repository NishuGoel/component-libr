"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipLinkList = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _ListItem = _interopRequireDefault(require("./ListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var List = _theming.styled.div({
  minWidth: 180,
  overflow: 'hidden'
}, function (_ref) {
  var theme = _ref.theme;
  return {
    borderRadius: theme.appBorderRadius * 2
  };
});

var TooltipLinkList = function TooltipLinkList(_ref2) {
  var links = _ref2.links,
      LinkWrapper = _ref2.LinkWrapper;
  return _react["default"].createElement(List, null, links.map(function (_ref3) {
    var id = _ref3.id,
        title = _ref3.title,
        href = _ref3.href,
        onClick = _ref3.onClick,
        active = _ref3.active,
        isGatsby = _ref3.isGatsby,
        props = _objectWithoutProperties(_ref3, ["id", "title", "href", "onClick", "active", "isGatsby"]);

    return _react["default"].createElement(_ListItem["default"], _extends({
      key: id || title,
      title: title,
      onClick: onClick,
      active: active,
      href: href,
      LinkWrapper: isGatsby ? LinkWrapper : null
    }, props));
  }));
};

exports.TooltipLinkList = TooltipLinkList;
TooltipLinkList.displayName = "TooltipLinkList";
TooltipLinkList.defaultProps = {
  LinkWrapper: _ListItem["default"].defaultProps.LinkWrapper
};