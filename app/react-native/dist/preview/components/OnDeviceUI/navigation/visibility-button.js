"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _native = _interopRequireDefault(require("@emotion/native"));

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Touchable =
/*#__PURE__*/
_native["default"].TouchableOpacity("background:transparent;position:absolute;right:8;bottom:12;z-index:100;");

var HideIcon =
/*#__PURE__*/
_native["default"].Text("font-size:14;color:", function (props) {
  return props.theme.buttonTextColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL3Zpc2liaWxpdHktYnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQjRCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL3Zpc2liaWxpdHktYnV0dG9uLnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBUb3VjaGFibGVPcGFjaXR5IH0gZnJvbSAncmVhY3QtbmF0aXZlJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9uYXRpdmUnO1xyXG5pbXBvcnQgeyBFbW90aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9TaGFyZWQvdGhlbWUnO1xyXG5cclxuaW50ZXJmYWNlIFByb3BzIHtcclxuICBvblByZXNzOiAoKSA9PiB2b2lkO1xyXG59XHJcblxyXG5jb25zdCBUb3VjaGFibGU6IHR5cGVvZiBUb3VjaGFibGVPcGFjaXR5ID0gc3R5bGVkLlRvdWNoYWJsZU9wYWNpdHlgXHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XHJcbiAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gIHJpZ2h0OiA4O1xyXG4gIGJvdHRvbTogMTI7XHJcbiAgei1pbmRleDogMTAwO1xyXG5gO1xyXG5cclxuY29uc3QgSGlkZUljb24gPSBzdHlsZWQuVGV4dGBcclxuICBmb250LXNpemU6IDE0O1xyXG4gIGNvbG9yOiAkeyhwcm9wczogRW1vdGlvblByb3BzKSA9PiBwcm9wcy50aGVtZS5idXR0b25UZXh0Q29sb3J9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlzaWJpbGl0eUJ1dHRvbiBleHRlbmRzIFB1cmVDb21wb25lbnQ8UHJvcHM+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IG9uUHJlc3MgfSA9IHRoaXMucHJvcHM7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8VG91Y2hhYmxlXHJcbiAgICAgICAgb25QcmVzcz17b25QcmVzc31cclxuICAgICAgICB0ZXN0SUQ9XCJTdG9yeWJvb2suT25EZXZpY2VVSS50b2dnbGVVSVwiXHJcbiAgICAgICAgYWNjZXNzaWJpbGl0eUxhYmVsPVwiU3Rvcnlib29rLk9uRGV2aWNlVUkudG9nZ2xlVUlcIlxyXG4gICAgICAgIGhpdFNsb3A9e3sgdG9wOiA1LCBsZWZ0OiA1LCBib3R0b206IDUsIHJpZ2h0OiA1IH19XHJcbiAgICAgID5cclxuICAgICAgICA8SGlkZUljb24+4pahPC9IaWRlSWNvbj5cclxuICAgICAgPC9Ub3VjaGFibGU+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0= */"));

var VisibilityButton =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(VisibilityButton, _PureComponent);

  function VisibilityButton() {
    _classCallCheck(this, VisibilityButton);

    return _possibleConstructorReturn(this, _getPrototypeOf(VisibilityButton).apply(this, arguments));
  }

  _createClass(VisibilityButton, [{
    key: "render",
    value: function render() {
      var onPress = this.props.onPress;
      return _react["default"].createElement(Touchable, {
        onPress: onPress,
        testID: "Storybook.OnDeviceUI.toggleUI",
        accessibilityLabel: "Storybook.OnDeviceUI.toggleUI",
        hitSlop: {
          top: 5,
          left: 5,
          bottom: 5,
          right: 5
        }
      }, _react["default"].createElement(HideIcon, null, "\u25A1"));
    }
  }]);

  return VisibilityButton;
}(_react.PureComponent);

exports["default"] = VisibilityButton;