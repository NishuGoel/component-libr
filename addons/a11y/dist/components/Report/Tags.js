"use strict";

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tags = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Wrapper = _theming.styled.div({
  display: 'flex',
  flexWrap: 'wrap',
  margin: '12px 0'
});

var Item = _theming.styled.div(function (_ref) {
  var theme = _ref.theme;
  return {
    margin: '0 6px',
    padding: '5px',
    border: "1px solid ".concat(theme.appBorderColor),
    borderRadius: theme.appBorderRadius
  };
});

var Tags = function Tags(_ref2) {
  var tags = _ref2.tags;
  return _react["default"].createElement(Wrapper, null, tags.map(function (tag) {
    return _react["default"].createElement(Item, {
      key: tag
    }, tag);
  }));
};

exports.Tags = Tags;