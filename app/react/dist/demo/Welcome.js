"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Main = function Main(props) {
  return _react["default"].createElement("article", _extends({}, props, {
    style: {
      padding: 15,
      lineHeight: 1.4,
      fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
      backgroundColor: '#fff'
    }
  }));
};

var Title = function Title(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  return _react["default"].createElement("h1", props, children);
};

Title.propTypes = {
  children: _propTypes["default"].node
};
Title.defaultProps = {
  children: undefined
};

var Note = function Note(props) {
  return _react["default"].createElement("p", _extends({}, props, {
    style: {
      opacity: 0.5
    }
  }));
};

var InlineCode = function InlineCode(props) {
  return _react["default"].createElement("code", _extends({}, props, {
    style: {
      fontSize: 15,
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a'
    }
  }));
};

var Link = function Link(_ref2) {
  var children = _ref2.children,
      href = _ref2.href,
      target = _ref2.target,
      props = _objectWithoutProperties(_ref2, ["children", "href", "target"]);

  return _react["default"].createElement("a", _extends({
    href: href
  }, props, {
    style: {
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2
    }
  }), children);
};

Link.propTypes = {
  href: _propTypes["default"].string,
  children: _propTypes["default"].node
};
Link.defaultProps = {
  href: undefined,
  children: undefined
};

var NavButton = function NavButton(_ref3) {
  var children = _ref3.children,
      onClick = _ref3.onClick,
      props = _objectWithoutProperties(_ref3, ["children", "onClick"]);

  return _react["default"].createElement("button", _extends({}, props, {
    type: "button",
    style: {
      color: '#1474f3',
      textDecoration: 'none',
      borderBottom: '1px solid #1474f3',
      paddingBottom: 2,
      borderTop: 'none',
      borderRight: 'none',
      borderLeft: 'none',
      backgroundColor: 'transparent',
      padding: 0,
      cursor: 'pointer',
      font: 'inherit'
    }
  }), children);
};

NavButton.propTypes = {
  children: _propTypes["default"].node
};
NavButton.defaultProps = {
  children: undefined
};

var Welcome = function Welcome(_ref4) {
  var showApp = _ref4.showApp;
  return _react["default"].createElement(Main, null, _react["default"].createElement(Title, null, "Welcome to storybook"), _react["default"].createElement("p", null, "This is a UI component dev environment for your app."), _react["default"].createElement("p", null, "We've added some basic stories inside the ", _react["default"].createElement(InlineCode, null, "src/stories"), " directory.", _react["default"].createElement("br", null), "A story is a single state of one or more UI components. You can have as many stories as you want.", _react["default"].createElement("br", null), "(Basically a story is like a visual test case.)"), _react["default"].createElement("p", null, "See these sample ", _react["default"].createElement(NavButton, {
    onClick: showApp
  }, "stories"), " for a component called", ' ', _react["default"].createElement(InlineCode, null, "Button"), "."), _react["default"].createElement("p", null, "Just like that, you can add your own components as stories.", _react["default"].createElement("br", null), "You can also edit those components and see changes right away.", _react["default"].createElement("br", null), "(Try editing the ", _react["default"].createElement(InlineCode, null, "Button"), " stories located at", ' ', _react["default"].createElement(InlineCode, null, "src/stories/index.js"), ".)"), _react["default"].createElement("p", null, "Usually we create stories with smaller UI components in the app.", _react["default"].createElement("br", null), "Have a look at the", ' ', _react["default"].createElement(Link, {
    href: "https://storybook.js.org/basics/writing-stories",
    target: "_blank",
    rel: "noopener noreferrer"
  }, "Writing Stories"), ' ', "section in our documentation."), _react["default"].createElement(Note, null, _react["default"].createElement("b", null, "NOTE:"), _react["default"].createElement("br", null), "Have a look at the ", _react["default"].createElement(InlineCode, null, ".storybook/webpack.config.js"), " to add webpack loaders and plugins you are using in this project."));
};

exports["default"] = Welcome;
Welcome.displayName = 'Welcome';
Welcome.propTypes = {
  showApp: _propTypes["default"].func
};
Welcome.defaultProps = {
  showApp: null
};