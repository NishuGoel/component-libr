"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loading = exports.nestedDepths = exports.longName = exports.storySelected = exports.story = exports.componentExpanded = exports.component = exports.group = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _SidebarItem = _interopRequireDefault(require("./SidebarItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _SidebarItem["default"],
  title: 'UI|Sidebar/SidebarItem',
  decorators: [function (storyFn) {
    return _react["default"].createElement("div", {
      style: {
        width: '240px',
        margin: '1rem',
        border: '1px dotted #ccc'
      }
    }, storyFn());
  }]
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  name: "Group"
});

var group = function group() {
  return _ref;
};

exports.group = group;
group.displayName = "group";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  name: "Component",
  isComponent: true
});

var component = function component() {
  return _ref2;
};

exports.component = component;
component.displayName = "component";

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  name: "Component",
  isComponent: true,
  isExpanded: true
});

var componentExpanded = function componentExpanded() {
  return _ref3;
};

exports.componentExpanded = componentExpanded;
componentExpanded.displayName = "componentExpanded";

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  name: "Story",
  isLeaf: true
});

var story = function story() {
  return _ref4;
};

exports.story = story;
story.displayName = "story";

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  name: "Story",
  isLeaf: true,
  isSelected: true
});

var storySelected = function storySelected() {
  return _ref5;
};

exports.storySelected = storySelected;
storySelected.displayName = "storySelected";

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  name: "Story with a long and windy name that is descriptive, precise, and readable. ",
  isComponent: true
});

var longName = function longName() {
  return _ref6;
};

exports.longName = longName;
longName.displayName = "longName";
longName.story = {
  name: 'with long name'
};

var _ref7 =
/*#__PURE__*/
_react["default"].createElement("div", null, _react["default"].createElement(_SidebarItem["default"], {
  name: "Depth 0 collapsed",
  depth: 0
}), _react["default"].createElement(_SidebarItem["default"], {
  name: "Depth 0 expanded",
  depth: 0,
  isExpanded: true
}), _react["default"].createElement(_SidebarItem["default"], {
  name: "Depth 1 expanded",
  depth: 1,
  isExpanded: true
}), _react["default"].createElement(_SidebarItem["default"], {
  name: "Depth 2 expanded",
  depth: 2,
  isComponent: true,
  isExpanded: true
}), _react["default"].createElement(_SidebarItem["default"], {
  name: "Depth 3",
  depth: 3,
  isLeaf: true
}));

var nestedDepths = function nestedDepths() {
  return _ref7;
};

exports.nestedDepths = nestedDepths;
nestedDepths.displayName = "nestedDepths";

var _ref8 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  loading: true
});

var loading = function loading() {
  return _ref8;
};

exports.loading = loading;
loading.displayName = "loading";