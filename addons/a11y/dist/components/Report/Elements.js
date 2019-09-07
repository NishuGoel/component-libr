"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Elements = void 0;

var _react = _interopRequireDefault(require("react"));

var _theming = require("@storybook/theming");

var _Rules = require("./Rules");

var _HighlightToggle = _interopRequireDefault(require("./HighlightToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var Item = _theming.styled.li({
  fontWeight: 600
});

var ItemTitle = _theming.styled.span(function (_ref) {
  var theme = _ref.theme;
  return {
    borderBottom: "1px solid ".concat(theme.appBorderColor),
    width: '100%',
    display: 'flex',
    paddingBottom: '6px',
    marginBottom: '6px',
    justifyContent: 'space-between'
  };
});

var HighlightToggleElement = _theming.styled.span({
  fontWeight: 'normal',
  alignSelf: 'center',
  paddingRight: '15px',
  input: {
    margin: 0
  }
});

var Element = function Element(_ref2) {
  var element = _ref2.element,
      type = _ref2.type;
  var any = element.any,
      all = element.all,
      none = element.none;
  var rules = [].concat(_toConsumableArray(any), _toConsumableArray(all), _toConsumableArray(none));
  var highlightToggleId = "".concat(type, "-").concat(element.target[0]);
  var highlightLabel = "Highlight";
  return _react["default"].createElement(Item, null, _react["default"].createElement(ItemTitle, null, element.target[0], _react["default"].createElement(HighlightToggleElement, null, _react["default"].createElement(_HighlightToggle["default"], {
    toggleId: highlightToggleId,
    type: type,
    elementsToHighlight: [element],
    label: highlightLabel
  }))), _react["default"].createElement(_Rules.Rules, {
    rules: rules
  }));
};

var Elements = function Elements(_ref3) {
  var elements = _ref3.elements,
      type = _ref3.type;
  return _react["default"].createElement("ol", null, elements.map(function (element, index) {
    return (// eslint-disable-next-line react/no-array-index-key
      _react["default"].createElement(Element, {
        element: element,
        key: index,
        type: type
      })
    );
  }));
};

exports.Elements = Elements;