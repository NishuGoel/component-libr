"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.all = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _ListItemIcon = _interopRequireDefault(require("./ListItemIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _ListItemIcon["default"],
  title: 'UI|Sidebar/ListItemIcon'
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_ListItemIcon["default"], {
  icon: "check"
});

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_ListItemIcon["default"], {
  imgSrc: "https://via.placeholder.com/20"
});

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_ListItemIcon["default"], null);

var all = function all() {
  return _react["default"].createElement(_components.TooltipLinkList, {
    links: [{
      title: 'has icon',
      left: _ref
    }, {
      title: 'has imgSrc',
      left: _ref2
    }, {
      title: 'has neither',
      left: _ref3
    }]
  });
};

exports.all = all;
all.displayName = "all";