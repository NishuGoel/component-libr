"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconGallery = exports.IconItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _BlockBackgroundStyles = require("./BlockBackgroundStyles");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var ItemLabel = _theming.styled.div({
  marginLeft: 10,
  lineHeight: 1.2
});

var ItemSpecimen = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return Object.assign({}, (0, _BlockBackgroundStyles.getBlockBackgroundStyle)(theme), {
    overflow: 'hidden',
    height: 40,
    width: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 'none',
    '> img, > svg': {
      width: 20,
      height: 20
    }
  });
});

var Item = _theming.styled.div({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  flex: '0 1 calc(20% - 10px)',
  minWidth: 120,
  margin: '0px 10px 30px 0'
});

var List = _theming.styled.div({
  display: 'flex',
  flexFlow: 'row wrap'
});

/**
 * An individual icon with a caption and an example (passed as `children`).
 */
var IconItem = function IconItem(_ref2) {
  var name = _ref2.name,
      children = _ref2.children;
  return _react["default"].createElement(Item, null, _react["default"].createElement(ItemSpecimen, null, children), _react["default"].createElement(ItemLabel, null, name));
};

exports.IconItem = IconItem;
IconItem.displayName = "IconItem";

/**
 * Show a grid of icons, as specified by `IconItem`.
 */
var IconGallery = function IconGallery(_ref3) {
  var children = _ref3.children,
      props = _objectWithoutProperties(_ref3, ["children"]);

  return _react["default"].createElement(List, props, children);
};

exports.IconGallery = IconGallery;
IconGallery.displayName = "IconGallery";