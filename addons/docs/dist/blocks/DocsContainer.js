"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DocsContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@mdx-js/react");

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

var _DocsContext = require("./DocsContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var defaultComponents = {
  // p: ({ children }) => <b>{children}</b>,
  wrapper: _components.DocumentFormatting
};

var globalWithOverflow = function globalWithOverflow(args) {
  var global = (0, _theming.createGlobal)(args);

  var body = global.body,
      rest = _objectWithoutProperties(global, ["body"]);

  var overflow = body.overflow,
      bodyRest = _objectWithoutProperties(body, ["overflow"]);

  return Object.assign({
    body: bodyRest
  }, rest);
};

var DocsContainer = function DocsContainer(_ref) {
  var context = _ref.context,
      MDXContent = _ref.content;
  var parameters = context && context.parameters || {};
  var options = parameters.options || {};
  var theme = (0, _theming.ensure)(options.theme);

  var _ref2 = options.docs || {},
      _ref2$components = _ref2.components,
      userComponents = _ref2$components === void 0 ? null : _ref2$components;

  var components = Object.assign({}, defaultComponents, {}, userComponents);
  return _react["default"].createElement(_DocsContext.DocsContext.Provider, {
    value: context
  }, _react["default"].createElement(_theming.ThemeProvider, {
    theme: theme
  }, _react["default"].createElement(_theming.Global, {
    styles: globalWithOverflow
  }), _react["default"].createElement(_react2.MDXProvider, {
    components: components
  }, _react["default"].createElement(_components.DocsWrapper, null, _react["default"].createElement(_components.DocsContent, null, _react["default"].createElement(MDXContent, {
    components: components
  }))))));
};

exports.DocsContainer = DocsContainer;