"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Link = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _router = require("@storybook/router");

var _treeview = require("./treeview/treeview");

var _SidebarItem = _interopRequireDefault(require("./SidebarItem"));

var _SidebarSearch = _interopRequireDefault(require("./SidebarSearch"));

var _SidebarSubheading = _interopRequireDefault(require("./SidebarSubheading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Search = (0, _theming.styled)(_SidebarSearch["default"])({
  margin: '0 20px 1rem'
});
var Subheading = (0, _theming.styled)(_SidebarSubheading["default"])({
  margin: '0 20px'
});
Subheading.propTypes = {
  className: _propTypes["default"].string
};
Subheading.defaultProps = {
  className: 'sidebar-subheading'
};

var Section = _theming.styled.section({
  '& + section': {
    marginTop: 20
  },
  '&:last-of-type': {
    marginBottom: 40
  }
});

var List = _theming.styled.div();

List.displayName = 'List';
var plain = {
  color: 'inherit',
  display: 'block',
  textDecoration: 'none',
  userSelect: 'none'
};
var PlainRouterLink = (0, _theming.styled)(_router.Link)(plain);

var PlainLink = _theming.styled.a(plain);

var Wrapper = _theming.styled.div({});

var refinedViewMode = function refinedViewMode(viewMode) {
  return viewMode === 'settings' ? 'story' : viewMode;
};

var Link = function Link(_ref) {
  var id = _ref.id,
      prefix = _ref.prefix,
      name = _ref.name,
      children = _ref.children,
      isLeaf = _ref.isLeaf,
      onClick = _ref.onClick,
      onKeyUp = _ref.onKeyUp;
  return isLeaf ? _react["default"].createElement(_router.Location, null, function (_ref2) {
    var viewMode = _ref2.viewMode;
    return _react["default"].createElement(PlainRouterLink, {
      title: name,
      id: prefix + id,
      to: "/".concat(refinedViewMode(viewMode) || 'story', "/").concat(id),
      onKeyUp: onKeyUp,
      onClick: onClick
    }, children);
  }) : _react["default"].createElement(PlainLink, {
    title: name,
    id: prefix + id,
    onKeyUp: onKeyUp,
    onClick: onClick
  }, children);
};

exports.Link = Link;
Link.displayName = 'Link';
Link.propTypes = {
  children: _propTypes["default"].node.isRequired,
  id: _propTypes["default"].string.isRequired,
  name: _propTypes["default"].string.isRequired,
  isLeaf: _propTypes["default"].bool.isRequired,
  prefix: _propTypes["default"].string.isRequired,
  onKeyUp: _propTypes["default"].func.isRequired,
  onClick: _propTypes["default"].func.isRequired
};

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  loading: true
});

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  loading: true
});

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 1,
  loading: true
});

var _ref7 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 1,
  loading: true
});

var _ref8 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 2,
  loading: true
});

var _ref9 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 3,
  loading: true
});

var _ref10 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 3,
  loading: true
});

var _ref11 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 3,
  loading: true
});

var _ref12 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 1,
  loading: true
});

var _ref13 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 1,
  loading: true
});

var _ref14 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 1,
  loading: true
});

var _ref15 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 2,
  loading: true
});

var _ref16 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 2,
  loading: true
});

var _ref17 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 2,
  loading: true
});

var _ref18 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  depth: 3,
  loading: true
});

var _ref19 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  loading: true
});

var _ref20 =
/*#__PURE__*/
_react["default"].createElement(_SidebarItem["default"], {
  loading: true
});

var _ref21 =
/*#__PURE__*/
_react["default"].createElement(_components.Placeholder, {
  key: "empty"
}, _react["default"].createElement(_react.Fragment, {
  key: "title"
}, "No stories found"), _react["default"].createElement(_react.Fragment, null, "Learn how to", ' ', _react["default"].createElement(_components.Link, {
  href: "https://storybook.js.org/basics/writing-stories/",
  target: "_blank"
}, "write stories")));

var SidebarStories = _react["default"].memo(function (_ref3) {
  var stories = _ref3.stories,
      storyId = _ref3.storyId,
      loading = _ref3.loading,
      className = _ref3.className,
      rest = _objectWithoutProperties(_ref3, ["stories", "storyId", "loading", "className"]);

  var list = Object.entries(stories);

  if (loading) {
    return _react["default"].createElement(Wrapper, {
      className: className
    }, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19, _ref20);
  }

  if (list.length < 1) {
    return _react["default"].createElement(Wrapper, {
      className: className
    }, _ref21);
  }

  return _react["default"].createElement(Wrapper, {
    className: className
  }, _react["default"].createElement(_treeview.TreeState, _extends({
    key: "treestate",
    dataset: stories,
    prefix: "explorer",
    selectedId: storyId,
    filter: "",
    List: List,
    Head: _SidebarItem["default"],
    Link: Link,
    Leaf: _SidebarItem["default"],
    Title: Subheading,
    Section: Section,
    Message: _components.Placeholder // eslint-disable-next-line react/jsx-no-duplicate-props
    ,
    Filter: Search
  }, rest)));
});

SidebarStories.propTypes = {
  loading: _propTypes["default"].bool,
  stories: _propTypes["default"].shape({}).isRequired,
  storyId: _propTypes["default"].string,
  className: _propTypes["default"].string
};
SidebarStories.defaultProps = {
  storyId: undefined,
  loading: false,
  className: null
};
var _default = SidebarStories;
exports["default"] = _default;