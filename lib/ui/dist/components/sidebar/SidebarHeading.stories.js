"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customBrandImage = exports.longText = exports.onlyText = exports.linkAndText = exports.standardNoLink = exports.standard = exports.standardData = exports.menuHighlighted = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _addonActions = require("@storybook/addon-actions");

var _SidebarHeading = _interopRequireDefault(require("./SidebarHeading"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var light = _theming.themes.light;
var theme = (0, _theming.convert)(light);
var _default = {
  component: _SidebarHeading["default"],
  title: 'UI|Sidebar/SidebarHeading',
  decorators: [function (storyFn) {
    return _react["default"].createElement("div", {
      style: {
        width: '240px',
        margin: '1rem'
      }
    }, storyFn());
  }],
  excludeStories: /.*Data$/
};
exports["default"] = _default;
var menuItems = [{
  title: 'Menu Item 1',
  onClick: (0, _addonActions.action)('onActivateMenuItem')
}, {
  title: 'Menu Item 2',
  onClick: (0, _addonActions.action)('onActivateMenuItem')
}, {
  title: 'Menu Item 3',
  onClick: (0, _addonActions.action)('onActivateMenuItem')
}];

var _ref =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menuHighlighted: true,
  menu: menuItems
});

var menuHighlighted = function menuHighlighted() {
  return _ref;
};

exports.menuHighlighted = menuHighlighted;
menuHighlighted.displayName = "menuHighlighted";
var standardData = {
  menu: menuItems
};
exports.standardData = standardData;

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menu: menuItems
});

var standard = function standard() {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: undefined,
        image: undefined
      }
    })
  }, _ref2);
};

exports.standard = standard;
standard.displayName = "standard";

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menu: menuItems
});

var standardNoLink = function standardNoLink() {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: undefined,
        url: null,
        image: undefined
      }
    })
  }, _ref3);
};

exports.standardNoLink = standardNoLink;
standardNoLink.displayName = "standardNoLink";

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menu: menuItems
});

var linkAndText = function linkAndText() {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: 'https://example.com',
        image: null
      }
    })
  }, _ref4);
};

exports.linkAndText = linkAndText;
linkAndText.displayName = "linkAndText";

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menu: menuItems
});

var onlyText = function onlyText() {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title',
        url: null,
        image: null
      }
    })
  }, _ref5);
};

exports.onlyText = onlyText;
onlyText.displayName = "onlyText";

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menu: menuItems
});

var longText = function longText() {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My title is way to long to actually fit',
        url: null,
        image: null
      }
    })
  }, _ref6);
};

exports.longText = longText;
longText.displayName = "longText";

var _ref7 =
/*#__PURE__*/
_react["default"].createElement(_SidebarHeading["default"], {
  menu: menuItems
});

var customBrandImage = function customBrandImage() {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: Object.assign({}, theme, {
      brand: {
        title: 'My Title',
        url: 'https://example.com',
        image: 'https://via.placeholder.com/150x22'
      }
    })
  }, _ref7);
};

exports.customBrandImage = customBrandImage;
customBrandImage.displayName = "customBrandImage";