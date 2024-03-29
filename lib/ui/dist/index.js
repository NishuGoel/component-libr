"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderStorybookUI;
Object.defineProperty(exports, "Provider", {
  enumerable: true,
  get: function get() {
    return _provider["default"];
  }
});
exports.Root = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _router = require("@storybook/router");

var _api = require("@storybook/api");

var _theming = require("@storybook/theming");

var _reactHelmetAsync = require("react-helmet-async");

var _app = _interopRequireDefault(require("./app"));

var _provider = _interopRequireDefault(require("./provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

_theming.ThemeProvider.displayName = 'ThemeProvider';
_reactHelmetAsync.HelmetProvider.displayName = 'HelmetProvider';

var getDocsMode = function getDocsMode() {
  try {
    // eslint-disable-next-line no-undef
    return !!DOCS_MODE; // webpack-injected
  } catch (e) {
    return false;
  }
};

var Container = process.env.XSTORYBOOK_EXAMPLE_APP ? _react["default"].StrictMode : _react["default"].Fragment;

var Root = function Root(_ref) {
  var provider = _ref.provider;
  return _react["default"].createElement(Container, {
    key: "container"
  }, _react["default"].createElement(_reactHelmetAsync.HelmetProvider, {
    key: "helmet.Provider"
  }, _react["default"].createElement(_router.LocationProvider, {
    key: "location.provider"
  }, _react["default"].createElement(_router.Location, {
    key: "location.consumer"
  }, function (locationData) {
    return _react["default"].createElement(_api.Provider, _extends({
      key: "manager",
      provider: provider
    }, locationData, {
      docsMode: getDocsMode()
    }), function (_ref2) {
      var state = _ref2.state,
          api = _ref2.api;
      var panelCount = Object.keys(api.getPanels()).length;
      return _react["default"].createElement(_theming.ThemeProvider, {
        key: "theme.provider",
        theme: (0, _theming.ensure)(state.theme)
      }, _react["default"].createElement(_app["default"], {
        key: "app",
        viewMode: state.viewMode,
        layout: state.layout,
        panelCount: panelCount
      }));
    });
  }))));
};

exports.Root = Root;
Root.displayName = "Root";
Root.propTypes = {
  provider: _propTypes["default"].shape({}).isRequired
};

function renderStorybookUI(domNode, provider) {
  if (!(provider instanceof _provider["default"])) {
    throw new Error('provider is not extended from the base Provider');
  }

  _reactDom["default"].render(_react["default"].createElement(Root, {
    key: "root",
    provider: provider
  }), domNode);
}