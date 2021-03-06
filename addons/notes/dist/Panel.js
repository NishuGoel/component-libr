"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.NotesLink = exports.SyntaxHighlighter = void 0;

var _react = _interopRequireWildcard(require("react"));

var _addons = require("@storybook/addons");

var _api = require("@storybook/api");

var _router = require("@storybook/router");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _giphy = _interopRequireDefault(require("./giphy"));

var _formatter = require("./formatter");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Panel = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return Object.assign({
    padding: '3rem 40px',
    boxSizing: 'border-box',
    width: '100%',
    maxWidth: 980,
    margin: '0 auto'
  }, theme.addonNotesTheme || {});
});

function read(param) {
  if (!param) {
    return undefined;
  }

  if (typeof param === 'string') {
    return param;
  }

  if ('disable' in param) {
    return undefined;
  }

  if ('text' in param) {
    return param.text;
  }

  if ('markdown' in param) {
    return param.markdown;
  }

  if (_typeof(param) === 'object') {
    return param;
  }

  return undefined;
}

var SyntaxHighlighter = function SyntaxHighlighter(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      props = _objectWithoutProperties(_ref2, ["className", "children"]);

  // markdown-to-jsx does not add className to inline code
  if (typeof className !== 'string') {
    return _react["default"].createElement("code", null, children);
  } // className: "lang-jsx"


  var language = className.split('-');
  return _react["default"].createElement(_components.SyntaxHighlighter, _extends({
    language: language[1] || 'plaintext',
    bordered: true,
    format: false,
    copyable: true
  }, props), children);
};

exports.SyntaxHighlighter = SyntaxHighlighter;

var NotesLink = function NotesLink(_ref3) {
  var href = _ref3.href,
      children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["href", "children"]);

  /* https://github.com/sindresorhus/is-absolute-url/blob/master/index.js */
  var isAbsoluteUrl = /^[a-z][a-z0-9+.-]*:/.test(href);

  if (isAbsoluteUrl) {
    return _react["default"].createElement("a", _extends({
      href: href
    }, props), children);
  }

  return _react["default"].createElement(_router.Link, _extends({
    to: href
  }, props), children);
}; // use our SyntaxHighlighter component in place of a <code> element when
// converting markdown to react elements


exports.NotesLink = NotesLink;
var defaultOptions = {
  overrides: {
    code: SyntaxHighlighter,
    a: NotesLink,
    Giphy: {
      component: _giphy["default"]
    }
  }
};

var mapper = function mapper(_ref4) {
  var state = _ref4.state,
      api = _ref4.api;
  var extraElements = Object.entries(api.getElements(_addons.types.NOTES_ELEMENT)).reduce(function (acc, _ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
        k = _ref6[0],
        v = _ref6[1];

    return Object.assign({}, acc, _defineProperty({}, k, v.render));
  }, {});
  var options = Object.assign({}, defaultOptions, {
    overrides: Object.assign({}, defaultOptions.overrides, {}, extraElements)
  });
  var story = state.storiesHash[state.storyId];
  var value = read(story ? api.getParameters(story.id, _shared.PARAM_KEY) : undefined);
  return {
    options: options,
    value: value
  };
};

var NotesPanel = function NotesPanel(_ref7) {
  var active = _ref7.active;

  if (!active) {
    return null;
  }

  return _react["default"].createElement(_api.Consumer, {
    filter: mapper
  }, function (_ref8) {
    var options = _ref8.options,
        value = _ref8.value;

    if (!value) {
      return _react["default"].createElement(_components.Placeholder, null, _react["default"].createElement(_react.Fragment, null, "No notes yet"), _react["default"].createElement(_react.Fragment, null, "Learn how to", ' ', _react["default"].createElement(_components.Link, {
        href: "https://github.com/storybookjs/storybook/tree/master/addons/notes",
        target: "_blank",
        withArrow: true,
        secondary: true,
        cancel: false
      }, "document components in Markdown")));
    }

    if (typeof value === 'string' || Object.keys(value).length === 1) {
      var md = _typeof(value) === 'object' ? Object.values(value)[0] : value;
      return _react["default"].createElement(Panel, {
        className: "addon-notes-container"
      }, _react["default"].createElement(_components.DocumentFormatting, null, _react["default"].createElement(_markdownToJsx["default"], {
        options: options
      }, (0, _formatter.formatter)(md))));
    }

    var groups = [];
    Object.entries(value).forEach(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 2),
          title = _ref10[0],
          docs = _ref10[1];

      groups.push({
        title: title,
        render: function render(_ref11) {
          var isActive = _ref11.active;
          return _react["default"].createElement(_components.TabWrapper, {
            key: title,
            active: isActive
          }, _react["default"].createElement(Panel, null, _react["default"].createElement(_components.DocumentFormatting, null, _react["default"].createElement(_markdownToJsx["default"], {
            options: options
          }, (0, _formatter.formatter)(docs)))));
        }
      });
    });
    return _react["default"].createElement("div", {
      className: "addon-notes-container"
    }, _react["default"].createElement(_components.TabsState, null, groups.map(function (group) {
      return _react["default"].createElement("div", {
        id: group.title,
        key: group.title,
        title: group.title
      }, group.render);
    })));
  });
};

var _default = NotesPanel;
exports["default"] = _default;