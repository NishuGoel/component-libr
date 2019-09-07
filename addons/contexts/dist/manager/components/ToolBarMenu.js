"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolBarMenu = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _ToolBarMenuOptions = require("./ToolBarMenuOptions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ToolBarMenu = function ToolBarMenu(_ref) {
  var icon = _ref.icon,
      title = _ref.title,
      active = _ref.active,
      expanded = _ref.expanded,
      setExpanded = _ref.setExpanded,
      optionsProps = _ref.optionsProps;
  return _react["default"].createElement(_components.WithTooltipPure, {
    closeOnClick: true,
    trigger: "click",
    placement: "top",
    tooltipShown: expanded,
    onVisibilityChange: setExpanded,
    tooltip: _react["default"].createElement(_ToolBarMenuOptions.ToolBarMenuOptions, optionsProps)
  }, icon ? _react["default"].createElement(_components.IconButton, {
    active: active,
    title: title
  }, _react["default"].createElement(_components.Icons, {
    icon: icon
  })) : _react["default"].createElement(_components.TabButton, {
    active: active
  }, title));
};

exports.ToolBarMenu = ToolBarMenu;