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

var _button = _interopRequireDefault(require("./button"));

var _constants = require("./constants");

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

var Container =
/*#__PURE__*/
_native["default"].View("flex-direction:row;padding-horizontal:8;background:", function (props) {
  return props.theme.backgroundColor;
}, ";border-top-width:1;border-bottom-width:1;border-color:", function (props) {
  return props.theme.borderColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2Jhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTTZCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9uYXZpZ2F0aW9uL2Jhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9uYXRpdmUnO1xyXG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vYnV0dG9uJztcclxuaW1wb3J0IHsgTkFWSUdBVE9SLCBQUkVWSUVXLCBBRERPTlMgfSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEVtb3Rpb25Qcm9wcyB9IGZyb20gJy4uLy4uL1NoYXJlZC90aGVtZSc7XHJcblxyXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuVmlld2BcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIHBhZGRpbmctaG9yaXpvbnRhbDogODtcclxuICBiYWNrZ3JvdW5kOiAkeyhwcm9wczogRW1vdGlvblByb3BzKSA9PiBwcm9wcy50aGVtZS5iYWNrZ3JvdW5kQ29sb3J9O1xyXG4gIGJvcmRlci10b3Atd2lkdGg6IDE7XHJcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMTtcclxuICBib3JkZXItY29sb3I6ICR7KHByb3BzOiBFbW90aW9uUHJvcHMpID0+IHByb3BzLnRoZW1lLmJvcmRlckNvbG9yfTtcclxuYDtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMge1xyXG4gIGluZGV4OiBudW1iZXI7XHJcbiAgb25QcmVzczogKGlkOiBudW1iZXIpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhciBleHRlbmRzIFB1cmVDb21wb25lbnQ8UHJvcHM+IHtcclxuICByZW5kZXIoKSB7XHJcbiAgICBjb25zdCB7IGluZGV4LCBvblByZXNzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgPENvbnRhaW5lcj5cclxuICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e29uUHJlc3N9IGlkPXtOQVZJR0FUT1J9IGFjdGl2ZT17aW5kZXggPT09IE5BVklHQVRPUn0+XHJcbiAgICAgICAgICBOQVZJR0FUT1JcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e29uUHJlc3N9IGlkPXtQUkVWSUVXfSBhY3RpdmU9e2luZGV4ID09PSBQUkVWSUVXfT5cclxuICAgICAgICAgIFBSRVZJRVdcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgICA8QnV0dG9uIG9uUHJlc3M9e29uUHJlc3N9IGlkPXtBRERPTlN9IGFjdGl2ZT17aW5kZXggPT09IEFERE9OU30+XHJcbiAgICAgICAgICBBRERPTlNcclxuICAgICAgICA8L0J1dHRvbj5cclxuICAgICAgPC9Db250YWluZXI+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0= */"));

var Bar =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Bar, _PureComponent);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Bar).apply(this, arguments));
  }

  _createClass(Bar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          index = _this$props.index,
          onPress = _this$props.onPress;
      return _react["default"].createElement(Container, null, _react["default"].createElement(_button["default"], {
        onPress: onPress,
        id: _constants.NAVIGATOR,
        active: index === _constants.NAVIGATOR
      }, "NAVIGATOR"), _react["default"].createElement(_button["default"], {
        onPress: onPress,
        id: _constants.PREVIEW,
        active: index === _constants.PREVIEW
      }, "PREVIEW"), _react["default"].createElement(_button["default"], {
        onPress: onPress,
        id: _constants.ADDONS,
        active: index === _constants.ADDONS
      }, "ADDONS"));
    }
  }]);

  return Bar;
}(_react.PureComponent);

exports["default"] = Bar;