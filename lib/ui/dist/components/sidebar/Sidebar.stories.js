"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = exports.simple = exports.loadingData = exports.simpleData = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Sidebar = _interopRequireDefault(require("./Sidebar"));

var _SidebarHeading = require("./SidebarHeading.stories");

var _SidebarStories = require("./SidebarStories.stories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _Sidebar["default"],
  title: 'UI|Sidebar/Sidebar',
  excludeStories: /.*Data$/
};
exports["default"] = _default;
var menu = _SidebarHeading.standardData.menu;
var stories = _SidebarStories.withRootData.stories,
    storyId = _SidebarStories.withRootData.storyId;
var simpleData = {
  menu: menu,
  stories: stories,
  storyId: storyId
};
exports.simpleData = simpleData;
var loadingData = {
  menu: menu,
  stories: {}
};
exports.loadingData = loadingData;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_Sidebar["default"], {
  menu: menu,
  stories: stories,
  storyId: storyId
});

var simple = function simple() {
  return _ref;
};

exports.simple = simple;
simple.displayName = "simple";

var loading = function loading() {
  return _react["default"].createElement(_Sidebar["default"], {
    menu: menu,
    stories: {},
    loading: true
  });
};

exports.loading = loading;
loading.displayName = "loading";