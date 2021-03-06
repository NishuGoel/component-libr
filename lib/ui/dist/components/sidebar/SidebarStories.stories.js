"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = exports.empty = exports.emptyData = exports.noRoot = exports.noRootData = exports.withRoot = exports.withRootData = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@storybook/components");

var _SidebarStories = _interopRequireDefault(require("./SidebarStories"));

var _treeview = require("./treeview/treeview.mockdata");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _SidebarStories["default"],
  title: 'UI|Sidebar/SidebarStories',
  decorators: [function (s) {
    return _react["default"].createElement(_components.Spaced, null, s());
  }],
  excludeStories: /.*Data$/
};
exports["default"] = _default;
var withRootData = {
  stories: _treeview.mockDataset.withRoot,
  storyId: '1-12-121'
};
exports.withRootData = withRootData;

var withRoot = function withRoot() {
  return _react["default"].createElement(_SidebarStories["default"], {
    stories: _treeview.mockDataset.withRoot,
    storyId: "1-12-121"
  });
};

exports.withRoot = withRoot;
withRoot.displayName = "withRoot";
var noRootData = {
  stories: _treeview.mockDataset.noRoot,
  storyId: '1-12-121'
};
exports.noRootData = noRootData;

var noRoot = function noRoot() {
  return _react["default"].createElement(_SidebarStories["default"], {
    stories: _treeview.mockDataset.noRoot,
    storyId: "1-12-121"
  });
};

exports.noRoot = noRoot;
noRoot.displayName = "noRoot";
var emptyData = {
  stories: {}
};
exports.emptyData = emptyData;

var empty = function empty() {
  return _react["default"].createElement(_SidebarStories["default"], {
    stories: {}
  });
};

exports.empty = empty;
empty.displayName = "empty";

var loading = function loading() {
  return _react["default"].createElement(_SidebarStories["default"], {
    loading: true,
    stories: {}
  });
};

exports.loading = loading;
loading.displayName = "loading";