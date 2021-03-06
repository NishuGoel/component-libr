"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _SidebarSubheading = _interopRequireDefault(require("./SidebarSubheading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _ref =
/*#__PURE__*/
_react["default"].createElement(_SidebarSubheading["default"], null, "Subheading");

(0, _react2.storiesOf)('UI|Sidebar/SidebarSubheading', module).addParameters({
  component: _SidebarSubheading["default"]
}).add('default', function () {
  return _ref;
});