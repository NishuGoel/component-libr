"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.HighlightedElementData = void 0;

var _global = require("global");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _theming = require("@storybook/theming");

var _memoizerific = _interopRequireDefault(require("memoizerific"));

var _reduxConfig = require("../../redux-config");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HighlightedElementData = function HighlightedElementData() {
  _classCallCheck(this, HighlightedElementData);

  this.originalOutline = void 0;
  this.isHighlighted = void 0;
};

exports.HighlightedElementData = HighlightedElementData;
var CheckBoxStates;

(function (CheckBoxStates) {
  CheckBoxStates[CheckBoxStates["CHECKED"] = 0] = "CHECKED";
  CheckBoxStates[CheckBoxStates["UNCHECKED"] = 1] = "UNCHECKED";
  CheckBoxStates[CheckBoxStates["INDETERMINATE"] = 2] = "INDETERMINATE";
})(CheckBoxStates || (CheckBoxStates = {}));

var Checkbox = _theming.styled.input(function (_ref) {
  var disabled = _ref.disabled;
  return {
    cursor: disabled ? 'not-allowed' : 'pointer'
  };
});

var colorsByType = [(0, _theming.convert)(_theming.themes.normal).color.negative, // VIOLATION,
(0, _theming.convert)(_theming.themes.normal).color.positive, // PASS,
(0, _theming.convert)(_theming.themes.normal).color.warning];
var getIframe = (0, _memoizerific["default"])(1)(function () {
  return _global.document.getElementsByTagName(_constants.IFRAME)[0];
});

function getElementBySelectorPath(elementPath) {
  var iframe = getIframe();

  if (iframe && iframe.contentDocument && elementPath) {
    return iframe.contentDocument.querySelector(elementPath);
  }

  return null;
}

function setElementOutlineStyle(targetElement, outlineStyle) {
  // eslint-disable-next-line no-param-reassign
  targetElement.style.outline = outlineStyle;
}

function areAllRequiredElementsHighlighted(elementsToHighlight, highlightedElementsMap) {
  var highlightedCount = elementsToHighlight.filter(function (item) {
    var targetElement = getElementBySelectorPath(item.target[0]);
    return highlightedElementsMap.has(targetElement) && highlightedElementsMap.get(targetElement).isHighlighted;
  }).length; // eslint-disable-next-line no-nested-ternary

  return highlightedCount === 0 ? CheckBoxStates.UNCHECKED : highlightedCount === elementsToHighlight.length ? CheckBoxStates.CHECKED : CheckBoxStates.INDETERMINATE;
}

function mapDispatchToProps(dispatch) {
  return {
    addElement: function addElement(data) {
      return dispatch((0, _reduxConfig.addElement)(data));
    }
  };
}

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var checkBoxState = areAllRequiredElementsHighlighted(ownProps.elementsToHighlight || [], state.highlightedElementsMap);
  return {
    highlightedElementsMap: state.highlightedElementsMap,
    isToggledOn: checkBoxState === CheckBoxStates.CHECKED,
    indeterminate: checkBoxState === CheckBoxStates.INDETERMINATE
  };
};

var HighlightToggle =
/*#__PURE__*/
function (_Component) {
  _inherits(HighlightToggle, _Component);

  function HighlightToggle() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, HighlightToggle);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(HighlightToggle)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.checkBoxRef = _react["default"].createRef();

    _this.onToggle = function () {
      var _this$props = _this.props,
          elementsToHighlight = _this$props.elementsToHighlight,
          highlightedElementsMap = _this$props.highlightedElementsMap;
      elementsToHighlight.forEach(function (element) {
        var targetElement = getElementBySelectorPath(element.target[0]);

        if (!highlightedElementsMap.has(targetElement)) {
          return;
        }

        var _highlightedElementsM = highlightedElementsMap.get(targetElement),
            originalOutline = _highlightedElementsM.originalOutline;

        var _highlightedElementsM2 = highlightedElementsMap.get(targetElement),
            isHighlighted = _highlightedElementsM2.isHighlighted;

        var isToggledOn = _this.props.isToggledOn;

        if (isToggledOn && isHighlighted || !isToggledOn && !isHighlighted) {
          var addHighlight = !isToggledOn && !isHighlighted;

          _this.highlightRuleLocation(targetElement, addHighlight);

          _this.saveElementDataToMap(targetElement, addHighlight, originalOutline);
        }
      });
    };

    return _this;
  }

  _createClass(HighlightToggle, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var _this$props2 = this.props,
          elementsToHighlight = _this$props2.elementsToHighlight,
          highlightedElementsMap = _this$props2.highlightedElementsMap;
      elementsToHighlight.forEach(function (element) {
        var targetElement = getElementBySelectorPath(element.target[0]);

        if (targetElement && !highlightedElementsMap.has(targetElement)) {
          _this2.saveElementDataToMap(targetElement, false, targetElement.style.outline);
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var indeterminate = this.props.indeterminate;

      if (this.checkBoxRef.current) {
        this.checkBoxRef.current.indeterminate = indeterminate;
      }
    }
  }, {
    key: "highlightRuleLocation",
    value: function highlightRuleLocation(targetElement, addHighlight) {
      var _this$props3 = this.props,
          highlightedElementsMap = _this$props3.highlightedElementsMap,
          type = _this$props3.type;

      if (!targetElement) {
        return;
      }

      if (addHighlight) {
        setElementOutlineStyle(targetElement, "".concat(colorsByType[type], " dotted 1px"));
        return;
      }

      if (highlightedElementsMap.has(targetElement)) {
        setElementOutlineStyle(targetElement, highlightedElementsMap.get(targetElement).originalOutline);
      }
    }
  }, {
    key: "saveElementDataToMap",
    value: function saveElementDataToMap(targetElement, isHighlighted, originalOutline) {
      var localAddElement = this.props.addElement;
      var data = new HighlightedElementData();
      data.isHighlighted = isHighlighted;
      data.originalOutline = originalOutline;
      var payload = {
        element: targetElement,
        highlightedElementData: data
      };
      localAddElement(payload);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          toggleId = _this$props4.toggleId,
          elementsToHighlight = _this$props4.elementsToHighlight,
          isToggledOn = _this$props4.isToggledOn;
      return _react["default"].createElement(Checkbox, {
        ref: this.checkBoxRef,
        id: toggleId,
        type: "checkbox",
        "aria-label": "Highlight result",
        disabled: !elementsToHighlight.length,
        onChange: this.onToggle,
        checked: isToggledOn
      });
    }
  }]);

  return HighlightToggle;
}(_react.Component);

HighlightToggle.defaultProps = {
  elementsToHighlight: []
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(HighlightToggle);

exports["default"] = _default;