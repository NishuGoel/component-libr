"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.string.bold");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _semver = _interopRequireDefault(require("semver"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _reactHotkeys = require("react-hotkeys");

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

var _components = require("@storybook/components");

var _SettingsFooter = _interopRequireDefault(require("./SettingsFooter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var keyMap = {
  CLOSE: 'escape'
};

var Header = _theming.styled.header(function (_ref) {
  var theme = _ref.theme;
  return {
    marginBottom: 20,
    fontSize: theme.typography.size.m3,
    fontWeight: theme.typography.weight.black,
    alignItems: 'center',
    display: 'flex',
    '> svg': {
      height: 32,
      width: 'auto',
      marginRight: 8
    }
  };
});

var Subheading = _theming.styled.span(function (_ref2) {
  var theme = _ref2.theme;
  return {
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    fontWeight: theme.typography.weight.black,
    fontSize: theme.typography.size.s2 - 1,
    lineHeight: '24px',
    color: theme.color.mediumdark
  };
});

var SubheadingLink = (0, _theming.styled)(_components.Link)(function (_ref3) {
  var theme = _ref3.theme;
  return {
    fontSize: theme.typography.size.s1
  };
});

var Subheader = _theming.styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '.75rem'
});

var UpdateMessage = _theming.styled.div(function (_ref4) {
  var status = _ref4.status,
      theme = _ref4.theme;

  if (status === 'positive') {
    return {
      background: theme.background.positive,
      color: theme.color.positive
    };
  }

  if (status === 'negative') {
    return {
      background: theme.background.negative,
      color: theme.color.negative
    };
  }

  return {
    background: '#EAF3FC',
    color: theme.color.darkest
  };
}, function (_ref5) {
  var theme = _ref5.theme;
  return {
    fontWeight: theme.typography.weight.bold,
    fontSize: theme.typography.size.s2,
    padding: '10px 20px',
    marginBottom: 24,
    borderRadius: theme.appBorderRadius,
    border: "1px solid ".concat(theme.appBorderColor),
    textAlign: 'center'
  };
});

var ErrorMessage = _theming.styled.div(function (_ref6) {
  var theme = _ref6.theme;
  return {
    fontWeight: theme.typography.weight.bold,
    textAlign: 'center'
  };
});

var Upgrade = _theming.styled.div(function (_ref7) {
  var theme = _ref7.theme;
  return {
    marginTop: 20,
    borderTop: "1px solid ".concat(theme.appBorderColor)
  };
});

var Container = _theming.styled.div({
  padding: "3rem 20px",
  maxWidth: 600,
  margin: '0 auto'
});

var _ref9 =
/*#__PURE__*/
_react["default"].createElement(UpdateMessage, {
  status: "neutral"
}, "Looking good! You're up to date.");

var _ref10 =
/*#__PURE__*/
_react["default"].createElement(UpdateMessage, {
  status: "negative"
}, "Oops! The latest version of Storybook couldn't be fetched.");

var _ref11 =
/*#__PURE__*/
_react["default"].createElement(_components.Icons, {
  icon: "close"
});

var _ref12 =
/*#__PURE__*/
_react["default"].createElement(_components.StorybookIcon, null);

var _ref13 =
/*#__PURE__*/
_react["default"].createElement(SubheadingLink, {
  secondary: true,
  href: "https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md",
  withArrow: true,
  cancel: false,
  target: "_blank"
}, "Read full changelog");

var _ref14 =
/*#__PURE__*/
_react["default"].createElement(ErrorMessage, null, _react["default"].createElement(_components.Link, {
  href: "https://github.com/storybookjs/storybook/releases",
  target: "_blank",
  withArrow: true,
  secondary: true,
  cancel: false
}, "Check Storybook's release history"));

var _ref15 =
/*#__PURE__*/
_react["default"].createElement(Upgrade, null, _react["default"].createElement(_components.DocumentFormatting, null, _react["default"].createElement("p", null, _react["default"].createElement("b", null, "Upgrade all Storybook packages to latest:")), _react["default"].createElement(_components.SyntaxHighlighter, {
  language: "bash",
  copyable: true,
  padded: true,
  bordered: true
}, "npx npm-check-updates '/storybook/' -u && npm install"), _react["default"].createElement("p", null, "Alternatively, if you're using yarn run the following command, and check all Storybook related packages:"), _react["default"].createElement(_components.SyntaxHighlighter, {
  language: "bash",
  copyable: true,
  padded: true,
  bordered: true
}, "yarn upgrade-interactive --latest")));

var _ref16 =
/*#__PURE__*/
_react["default"].createElement(_SettingsFooter["default"], null);

var AboutScreen = function AboutScreen(_ref8) {
  var latest = _ref8.latest,
      current = _ref8.current,
      onClose = _ref8.onClose;

  var canUpdate = latest && _semver["default"].gt(latest.version, current.version);

  var updateMessage;

  if (latest) {
    if (canUpdate) {
      updateMessage = _react["default"].createElement(UpdateMessage, {
        status: "positive"
      }, "Storybook ", latest.version, " is available. Upgrade from ", current.version, " now.");
    } else {
      updateMessage = _ref9;
    }
  } else {
    updateMessage = _ref10;
  }

  return _react["default"].createElement(_reactHotkeys.GlobalHotKeys, {
    handlers: {
      CLOSE: onClose
    },
    keyMap: keyMap
  }, _react["default"].createElement(_components.Tabs, {
    absolute: true,
    selected: "about",
    actions: {
      onSelect: function onSelect() {}
    },
    tools: _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(_components.IconButton, {
      onClick: function onClick(e) {
        e.preventDefault();
        return onClose();
      }
    }, _ref11))
  }, _react["default"].createElement("div", {
    id: "about",
    title: "About"
  }, _react["default"].createElement(Container, null, _react["default"].createElement(Header, null, _ref12, "Storybook ", current.version), updateMessage, latest ? _react["default"].createElement(_react.Fragment, null, _react["default"].createElement(Subheader, null, _react["default"].createElement(Subheading, null, latest.version, " Changelog"), _ref13), _react["default"].createElement(_components.DocumentFormatting, null, _react["default"].createElement(_markdownToJsx["default"], null, latest.info.plain))) : _ref14, canUpdate && _ref15, _ref16))));
};

exports["default"] = AboutScreen;
AboutScreen.displayName = "AboutScreen";
AboutScreen.propTypes = {
  current: _propTypes["default"].shape({
    version: _propTypes["default"].string.isRequired
  }).isRequired,
  latest: _propTypes["default"].shape({
    version: _propTypes["default"].string.isRequired,
    info: _propTypes["default"].shape({
      plain: _propTypes["default"].string.isRequired
    }).isRequired
  }),
  onClose: _propTypes["default"].func.isRequired
};
AboutScreen.defaultProps = {
  latest: null
};