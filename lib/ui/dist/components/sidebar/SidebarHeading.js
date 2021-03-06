"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.string.bold");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _theming = require("@storybook/theming");

var _components = require("@storybook/components");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var BrandArea = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    fontSize: theme.typography.size.s2,
    fontWeight: theme.typography.weight.bold,
    marginRight: theme.layoutMargin,
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    minHeight: 28,
    '& > *': {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto',
      display: 'block'
    }
  };
});

var Logo = (0, _theming.styled)(_components.StorybookLogo)({
  width: 'auto',
  height: 22,
  display: 'block'
});

var Img = _theming.styled.img({
  width: 'auto',
  height: 'auto',
  display: 'block',
  maxWidth: '100%'
});

var LogoLink = _theming.styled.a({
  display: 'block',
  width: '100%',
  height: '100%',
  color: 'inherit',
  textDecoration: 'none'
});

var MenuButton = (0, _theming.styled)(_components.Button)(function (props) {
  return Object.assign({
    position: 'relative',
    overflow: 'visible',
    padding: 7
  }, props.highlighted && {
    '&:after': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 8,
      background: "".concat(props.theme.color.positive)
    }
  });
});

var Head = _theming.styled.div({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between'
});

var Brand = (0, _theming.withTheme)(function (_ref2) {
  var _ref2$theme$brand = _ref2.theme.brand,
      _ref2$theme$brand$tit = _ref2$theme$brand.title,
      title = _ref2$theme$brand$tit === void 0 ? 'Storybook' : _ref2$theme$brand$tit,
      _ref2$theme$brand$url = _ref2$theme$brand.url,
      url = _ref2$theme$brand$url === void 0 ? './' : _ref2$theme$brand$url,
      image = _ref2$theme$brand.image;
  var targetValue = url === './' ? '' : '_blank';

  if (image === undefined && url === null) {
    return _react["default"].createElement(Logo, {
      alt: title
    });
  }

  if (image === undefined && url) {
    return _react["default"].createElement(LogoLink, {
      href: url,
      target: targetValue
    }, _react["default"].createElement(Logo, {
      alt: title
    }));
  }

  if (image === null && url === null) {
    return title;
  }

  if (image === null && url) {
    return _react["default"].createElement(LogoLink, {
      href: url,
      target: targetValue,
      dangerouslySetInnerHTML: {
        __html: title
      }
    });
  }

  if (image && url === null) {
    return _react["default"].createElement(Img, {
      src: image,
      alt: title
    });
  }

  if (image && url) {
    return _react["default"].createElement(LogoLink, {
      href: url,
      target: targetValue
    }, _react["default"].createElement(Img, {
      src: image,
      alt: title
    }));
  }

  return null;
});

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(BrandArea, null, _react["default"].createElement(Brand, null));

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_components.Icons, {
  icon: "ellipsis"
});

var SidebarHeading = function SidebarHeading(_ref3) {
  var menuHighlighted = _ref3.menuHighlighted,
      menu = _ref3.menu,
      props = _objectWithoutProperties(_ref3, ["menuHighlighted", "menu"]);

  return _react["default"].createElement(Head, props, _ref4, _react["default"].createElement(_components.WithTooltip, {
    placement: "top",
    trigger: "click",
    tooltip: function tooltip(_ref5) {
      var onHide = _ref5.onHide;
      return _react["default"].createElement(_components.TooltipLinkList, {
        links: menu.map(function (i) {
          return Object.assign({}, i, {
            onClick: function onClick() {
              i.onClick.apply(i, arguments);
              onHide();
            }
          });
        })
      });
    },
    closeOnClick: true
  }, _react["default"].createElement(MenuButton, {
    outline: true,
    small: true,
    containsIcon: true,
    highlighted: menuHighlighted,
    title: "Shortcuts"
  }, _ref6)));
};

exports["default"] = SidebarHeading;
SidebarHeading.displayName = "SidebarHeading";
SidebarHeading.propTypes = {
  menuHighlighted: _propTypes["default"].bool,
  menu: _propTypes["default"].arrayOf(_propTypes["default"].shape({})).isRequired
};
SidebarHeading.defaultProps = {
  menuHighlighted: false
};