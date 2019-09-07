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

var _reactNative = require("react-native");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _StoryListView = _interopRequireDefault(require("../StoryListView"));

var _StoryView = _interopRequireDefault(require("../StoryView"));

var _addons2 = _interopRequireDefault(require("./addons"));

var _panel = _interopRequireDefault(require("./panel"));

var _navigation = _interopRequireDefault(require("./navigation"));

var _absolutePositionedKeyboardAwareView = _interopRequireDefault(require("./absolute-positioned-keyboard-aware-view"));

var _constants = require("./navigation/constants");

var _animation = require("./animation");

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

var ANIMATION_DURATION = 300;
var IS_IOS = _reactNative.Platform.OS === 'ios';

var Preview =
/*#__PURE__*/
_native["default"].TouchableOpacity("flex:1;border-left-width:", function (props) {
  return props.disabled ? '0' : '1';
}, ";border-top-width:", function (props) {
  return props.disabled ? '0' : '1';
}, ";border-right-width:", function (props) {
  return props.disabled ? '0' : '1';
}, ";border-bottom-width:", function (props) {
  return props.disabled ? '0' : '1';
}, ";border-color:", function (props) {
  return props.disabled ? 'transparent' : props.theme.previewBorderColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0RnRSIsImZpbGUiOiIuLi8uLi8uLi8uLi9zcmMvcHJldmlldy9jb21wb25lbnRzL09uRGV2aWNlVUkvaW5kZXgudHN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IFB1cmVDb21wb25lbnQgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7XHJcbiAgS2V5Ym9hcmQsXHJcbiAgS2V5Ym9hcmRBdm9pZGluZ1ZpZXcsXHJcbiAgUGxhdGZvcm0sXHJcbiAgQW5pbWF0ZWQsXHJcbiAgVG91Y2hhYmxlT3BhY2l0eSxcclxuICBUb3VjaGFibGVPcGFjaXR5UHJvcHMsXHJcbn0gZnJvbSAncmVhY3QtbmF0aXZlJztcclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9uYXRpdmUnO1xyXG5pbXBvcnQgYWRkb25zIGZyb20gJ0BzdG9yeWJvb2svYWRkb25zJztcclxuaW1wb3J0IENoYW5uZWwgZnJvbSAnQHN0b3J5Ym9vay9jaGFubmVscyc7XHJcbmltcG9ydCBTdG9yeUxpc3RWaWV3IGZyb20gJy4uL1N0b3J5TGlzdFZpZXcnO1xyXG5pbXBvcnQgU3RvcnlWaWV3IGZyb20gJy4uL1N0b3J5Vmlldyc7XHJcbmltcG9ydCBBZGRvbnMgZnJvbSAnLi9hZGRvbnMnO1xyXG5pbXBvcnQgUGFuZWwgZnJvbSAnLi9wYW5lbCc7XHJcbmltcG9ydCBOYXZpZ2F0aW9uIGZyb20gJy4vbmF2aWdhdGlvbic7XHJcbmltcG9ydCBBYnNvbHV0ZVBvc2l0aW9uZWRLZXlib2FyZEF3YXJlVmlldywge1xyXG4gIFByZXZpZXdEaW1lbnMsXHJcbn0gZnJvbSAnLi9hYnNvbHV0ZS1wb3NpdGlvbmVkLWtleWJvYXJkLWF3YXJlLXZpZXcnO1xyXG5pbXBvcnQgeyBQUkVWSUVXIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7XHJcbiAgZ2V0UHJldmlld1Bvc2l0aW9uLFxyXG4gIGdldFByZXZpZXdTY2FsZSxcclxuICBnZXRBZGRvblBhbmVsUG9zaXRpb24sXHJcbiAgZ2V0TmF2aWdhdG9yUGFuZWxQb3NpdGlvbixcclxufSBmcm9tICcuL2FuaW1hdGlvbic7XHJcbmltcG9ydCB7IEVtb3Rpb25Qcm9wcyB9IGZyb20gJy4uL1NoYXJlZC90aGVtZSc7XHJcblxyXG5jb25zdCBBTklNQVRJT05fRFVSQVRJT04gPSAzMDA7XHJcbmNvbnN0IElTX0lPUyA9IFBsYXRmb3JtLk9TID09PSAnaW9zJztcclxuXHJcbmludGVyZmFjZSBPbkRldmljZVVJUHJvcHMge1xyXG4gIHN0b3JpZXM6IGFueTtcclxuICB1cmw/OiBzdHJpbmc7XHJcbiAgdGFiT3Blbj86IG51bWJlcjtcclxuICBpc1VJSGlkZGVuPzogYm9vbGVhbjtcclxuICBzaG91bGREaXNhYmxlS2V5Ym9hcmRBdm9pZGluZ1ZpZXc/OiBib29sZWFuO1xyXG4gIGtleWJvYXJkQXZvaWRpbmdWaWV3VmVydGljYWxPZmZzZXQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmludGVyZmFjZSBPbkRldmljZVVJU3RhdGUge1xyXG4gIHRhYk9wZW46IG51bWJlcjtcclxuICBzbGlkZUJldHdlZW5BbmltYXRpb246IGJvb2xlYW47XHJcbiAgcHJldmlld1dpZHRoOiBudW1iZXI7XHJcbiAgcHJldmlld0hlaWdodDogbnVtYmVyO1xyXG59XHJcblxyXG50eXBlIEVtb3Rpb25QcmV2aWV3UHJvcHMgPSBFbW90aW9uUHJvcHMgJiBUb3VjaGFibGVPcGFjaXR5UHJvcHM7XHJcblxyXG5jb25zdCBQcmV2aWV3OiB0eXBlb2YgVG91Y2hhYmxlT3BhY2l0eSA9IHN0eWxlZC5Ub3VjaGFibGVPcGFjaXR5YFxyXG4gIGZsZXg6IDE7XHJcbiAgYm9yZGVyLWxlZnQtd2lkdGg6ICR7KHByb3BzOiBFbW90aW9uUHJldmlld1Byb3BzKSA9PiAocHJvcHMuZGlzYWJsZWQgPyAnMCcgOiAnMScpfTtcclxuICBib3JkZXItdG9wLXdpZHRoOiAkeyhwcm9wczogRW1vdGlvblByZXZpZXdQcm9wcykgPT4gKHByb3BzLmRpc2FibGVkID8gJzAnIDogJzEnKX07XHJcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAkeyhwcm9wczogRW1vdGlvblByZXZpZXdQcm9wcykgPT4gKHByb3BzLmRpc2FibGVkID8gJzAnIDogJzEnKX07XHJcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogJHsocHJvcHM6IEVtb3Rpb25QcmV2aWV3UHJvcHMpID0+IChwcm9wcy5kaXNhYmxlZCA/ICcwJyA6ICcxJyl9O1xyXG4gIGJvcmRlci1jb2xvcjogJHsocHJvcHM6IEVtb3Rpb25QcmV2aWV3UHJvcHMpID0+XHJcbiAgICBwcm9wcy5kaXNhYmxlZCA/ICd0cmFuc3BhcmVudCcgOiBwcm9wcy50aGVtZS5wcmV2aWV3Qm9yZGVyQ29sb3J9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT25EZXZpY2VVSSBleHRlbmRzIFB1cmVDb21wb25lbnQ8T25EZXZpY2VVSVByb3BzLCBPbkRldmljZVVJU3RhdGU+IHtcclxuICBhbmltYXRlZFZhbHVlOiBBbmltYXRlZC5WYWx1ZTtcclxuXHJcbiAgY2hhbm5lbDogQ2hhbm5lbDtcclxuXHJcbiAgY29uc3RydWN0b3IocHJvcHM6IE9uRGV2aWNlVUlQcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG4gICAgY29uc3QgdGFiT3BlbiA9IHByb3BzLnRhYk9wZW4gfHwgUFJFVklFVztcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHRhYk9wZW4sXHJcbiAgICAgIHNsaWRlQmV0d2VlbkFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgIHByZXZpZXdXaWR0aDogMCxcclxuICAgICAgcHJldmlld0hlaWdodDogMCxcclxuICAgIH07XHJcbiAgICB0aGlzLmFuaW1hdGVkVmFsdWUgPSBuZXcgQW5pbWF0ZWQuVmFsdWUodGFiT3Blbik7XHJcbiAgICB0aGlzLmNoYW5uZWwgPSBhZGRvbnMuZ2V0Q2hhbm5lbCgpO1xyXG4gIH1cclxuXHJcbiAgb25MYXlvdXQgPSAoeyBwcmV2aWV3V2lkdGgsIHByZXZpZXdIZWlnaHQgfTogUHJldmlld0RpbWVucykgPT4ge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHByZXZpZXdXaWR0aCwgcHJldmlld0hlaWdodCB9KTtcclxuICB9O1xyXG5cclxuICBoYW5kbGVPcGVuUHJldmlldyA9ICgpID0+IHtcclxuICAgIHRoaXMuaGFuZGxlVG9nZ2xlVGFiKFBSRVZJRVcpO1xyXG4gIH07XHJcblxyXG4gIGhhbmRsZVRvZ2dsZVRhYiA9IChuZXdUYWJPcGVuOiBudW1iZXIpID0+IHtcclxuICAgIGNvbnN0IHsgdGFiT3BlbiB9ID0gdGhpcy5zdGF0ZTtcclxuICAgIGlmIChuZXdUYWJPcGVuID09PSB0YWJPcGVuKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIEFuaW1hdGVkLnRpbWluZyh0aGlzLmFuaW1hdGVkVmFsdWUsIHtcclxuICAgICAgdG9WYWx1ZTogbmV3VGFiT3BlbixcclxuICAgICAgZHVyYXRpb246IEFOSU1BVElPTl9EVVJBVElPTixcclxuICAgICAgdXNlTmF0aXZlRHJpdmVyOiB0cnVlLFxyXG4gICAgfSkuc3RhcnQoKTtcclxuICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICB0YWJPcGVuOiBuZXdUYWJPcGVuLFxyXG4gICAgICAvLyBUcnVlIGlmIHN3aXBpbmcgYmV0d2VlbiBuYXZpZ2F0b3IgYW5kIGFkZG9uc1xyXG4gICAgICBzbGlkZUJldHdlZW5BbmltYXRpb246IHRhYk9wZW4gKyBuZXdUYWJPcGVuID09PSBQUkVWSUVXLFxyXG4gICAgfSk7XHJcbiAgICAvLyBjbG9zZSB0aGUga2V5Ym9hcmQgb3BlbmVkIGZyb20gYSBUZXh0SW5wdXQgZnJvbSBzdG9yeSBsaXN0IG9yIGtub2JzXHJcbiAgICBpZiAobmV3VGFiT3BlbiA9PT0gUFJFVklFVykge1xyXG4gICAgICBLZXlib2FyZC5kaXNtaXNzKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBzdG9yaWVzLFxyXG4gICAgICB1cmwsXHJcbiAgICAgIGlzVUlIaWRkZW4sXHJcbiAgICAgIHNob3VsZERpc2FibGVLZXlib2FyZEF2b2lkaW5nVmlldyxcclxuICAgICAga2V5Ym9hcmRBdm9pZGluZ1ZpZXdWZXJ0aWNhbE9mZnNldCxcclxuICAgIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIGNvbnN0IHsgdGFiT3Blbiwgc2xpZGVCZXR3ZWVuQW5pbWF0aW9uLCBwcmV2aWV3V2lkdGgsIHByZXZpZXdIZWlnaHQgfSA9IHRoaXMuc3RhdGU7XHJcblxyXG4gICAgY29uc3QgcHJldmlld1dyYXBwZXJTdHlsZXMgPSBbXHJcbiAgICAgIHsgZmxleDogMSB9LFxyXG4gICAgICBnZXRQcmV2aWV3UG9zaXRpb24odGhpcy5hbmltYXRlZFZhbHVlLCBwcmV2aWV3V2lkdGgsIHByZXZpZXdIZWlnaHQsIHNsaWRlQmV0d2VlbkFuaW1hdGlvbiksXHJcbiAgICBdO1xyXG5cclxuICAgIGNvbnN0IHByZXZpZXdTdHlsZXMgPSBbeyBmbGV4OiAxIH0sIGdldFByZXZpZXdTY2FsZSh0aGlzLmFuaW1hdGVkVmFsdWUsIHNsaWRlQmV0d2VlbkFuaW1hdGlvbildO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxLZXlib2FyZEF2b2lkaW5nVmlld1xyXG4gICAgICAgIGVuYWJsZWQ9eyFzaG91bGREaXNhYmxlS2V5Ym9hcmRBdm9pZGluZ1ZpZXcgfHwgdGFiT3BlbiAhPT0gUFJFVklFV31cclxuICAgICAgICBiZWhhdmlvcj17SVNfSU9TID8gJ3BhZGRpbmcnIDogbnVsbH1cclxuICAgICAgICBrZXlib2FyZFZlcnRpY2FsT2Zmc2V0PXtrZXlib2FyZEF2b2lkaW5nVmlld1ZlcnRpY2FsT2Zmc2V0fVxyXG4gICAgICAgIHN0eWxlPXt7IGZsZXg6IDEgfX1cclxuICAgICAgPlxyXG4gICAgICAgIDxBYnNvbHV0ZVBvc2l0aW9uZWRLZXlib2FyZEF3YXJlVmlld1xyXG4gICAgICAgICAgb25MYXlvdXQ9e3RoaXMub25MYXlvdXR9XHJcbiAgICAgICAgICBwcmV2aWV3SGVpZ2h0PXtwcmV2aWV3SGVpZ2h0fVxyXG4gICAgICAgICAgcHJldmlld1dpZHRoPXtwcmV2aWV3V2lkdGh9XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPEFuaW1hdGVkLlZpZXcgc3R5bGU9e3ByZXZpZXdXcmFwcGVyU3R5bGVzfT5cclxuICAgICAgICAgICAgPEFuaW1hdGVkLlZpZXcgc3R5bGU9e3ByZXZpZXdTdHlsZXN9PlxyXG4gICAgICAgICAgICAgIDxQcmV2aWV3XHJcbiAgICAgICAgICAgICAgICBhY2Nlc3NpYmxlPXtmYWxzZX1cclxuICAgICAgICAgICAgICAgIGRpc2FibGVkPXt0YWJPcGVuID09PSBQUkVWSUVXfVxyXG4gICAgICAgICAgICAgICAgb25QcmVzcz17dGhpcy5oYW5kbGVPcGVuUHJldmlld31cclxuICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8U3RvcnlWaWV3IHVybD17dXJsfSBvbkRldmljZSBzdG9yaWVzPXtzdG9yaWVzfSAvPlxyXG4gICAgICAgICAgICAgIDwvUHJldmlldz5cclxuICAgICAgICAgICAgPC9BbmltYXRlZC5WaWV3PlxyXG4gICAgICAgICAgPC9BbmltYXRlZC5WaWV3PlxyXG4gICAgICAgICAgPFBhbmVsIHN0eWxlPXtnZXROYXZpZ2F0b3JQYW5lbFBvc2l0aW9uKHRoaXMuYW5pbWF0ZWRWYWx1ZSwgcHJldmlld1dpZHRoKX0+XHJcbiAgICAgICAgICAgIDxTdG9yeUxpc3RWaWV3IHN0b3JpZXM9e3N0b3JpZXN9IC8+XHJcbiAgICAgICAgICA8L1BhbmVsPlxyXG4gICAgICAgICAgPFBhbmVsIHN0eWxlPXtnZXRBZGRvblBhbmVsUG9zaXRpb24odGhpcy5hbmltYXRlZFZhbHVlLCBwcmV2aWV3V2lkdGgpfT5cclxuICAgICAgICAgICAgPEFkZG9ucyAvPlxyXG4gICAgICAgICAgPC9QYW5lbD5cclxuICAgICAgICA8L0Fic29sdXRlUG9zaXRpb25lZEtleWJvYXJkQXdhcmVWaWV3PlxyXG4gICAgICAgIDxOYXZpZ2F0aW9uXHJcbiAgICAgICAgICB0YWJPcGVuPXt0YWJPcGVufVxyXG4gICAgICAgICAgb25DaGFuZ2VUYWI9e3RoaXMuaGFuZGxlVG9nZ2xlVGFifVxyXG4gICAgICAgICAgaW5pdGlhbFVpVmlzaWJsZT17IWlzVUlIaWRkZW59XHJcbiAgICAgICAgLz5cclxuICAgICAgPC9LZXlib2FyZEF2b2lkaW5nVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"));

var OnDeviceUI =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(OnDeviceUI, _PureComponent);

  function OnDeviceUI(props) {
    var _this;

    _classCallCheck(this, OnDeviceUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(OnDeviceUI).call(this, props));
    _this.animatedValue = void 0;
    _this.channel = void 0;

    _this.onLayout = function (_ref) {
      var previewWidth = _ref.previewWidth,
          previewHeight = _ref.previewHeight;

      _this.setState({
        previewWidth: previewWidth,
        previewHeight: previewHeight
      });
    };

    _this.handleOpenPreview = function () {
      _this.handleToggleTab(_constants.PREVIEW);
    };

    _this.handleToggleTab = function (newTabOpen) {
      var tabOpen = _this.state.tabOpen;

      if (newTabOpen === tabOpen) {
        return;
      }

      _reactNative.Animated.timing(_this.animatedValue, {
        toValue: newTabOpen,
        duration: ANIMATION_DURATION,
        useNativeDriver: true
      }).start();

      _this.setState({
        tabOpen: newTabOpen,
        // True if swiping between navigator and addons
        slideBetweenAnimation: tabOpen + newTabOpen === _constants.PREVIEW
      }); // close the keyboard opened from a TextInput from story list or knobs


      if (newTabOpen === _constants.PREVIEW) {
        _reactNative.Keyboard.dismiss();
      }
    };

    var _tabOpen = props.tabOpen || _constants.PREVIEW;

    _this.state = {
      tabOpen: _tabOpen,
      slideBetweenAnimation: false,
      previewWidth: 0,
      previewHeight: 0
    };
    _this.animatedValue = new _reactNative.Animated.Value(_tabOpen);
    _this.channel = _addons["default"].getChannel();
    return _this;
  }

  _createClass(OnDeviceUI, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          stories = _this$props.stories,
          url = _this$props.url,
          isUIHidden = _this$props.isUIHidden,
          shouldDisableKeyboardAvoidingView = _this$props.shouldDisableKeyboardAvoidingView,
          keyboardAvoidingViewVerticalOffset = _this$props.keyboardAvoidingViewVerticalOffset;
      var _this$state = this.state,
          tabOpen = _this$state.tabOpen,
          slideBetweenAnimation = _this$state.slideBetweenAnimation,
          previewWidth = _this$state.previewWidth,
          previewHeight = _this$state.previewHeight;
      var previewWrapperStyles = [{
        flex: 1
      }, (0, _animation.getPreviewPosition)(this.animatedValue, previewWidth, previewHeight, slideBetweenAnimation)];
      var previewStyles = [{
        flex: 1
      }, (0, _animation.getPreviewScale)(this.animatedValue, slideBetweenAnimation)];
      return _react["default"].createElement(_reactNative.KeyboardAvoidingView, {
        enabled: !shouldDisableKeyboardAvoidingView || tabOpen !== _constants.PREVIEW,
        behavior: IS_IOS ? 'padding' : null,
        keyboardVerticalOffset: keyboardAvoidingViewVerticalOffset,
        style: {
          flex: 1
        }
      }, _react["default"].createElement(_absolutePositionedKeyboardAwareView["default"], {
        onLayout: this.onLayout,
        previewHeight: previewHeight,
        previewWidth: previewWidth
      }, _react["default"].createElement(_reactNative.Animated.View, {
        style: previewWrapperStyles
      }, _react["default"].createElement(_reactNative.Animated.View, {
        style: previewStyles
      }, _react["default"].createElement(Preview, {
        accessible: false,
        disabled: tabOpen === _constants.PREVIEW,
        onPress: this.handleOpenPreview
      }, _react["default"].createElement(_StoryView["default"], {
        url: url,
        onDevice: true,
        stories: stories
      })))), _react["default"].createElement(_panel["default"], {
        style: (0, _animation.getNavigatorPanelPosition)(this.animatedValue, previewWidth)
      }, _react["default"].createElement(_StoryListView["default"], {
        stories: stories
      })), _react["default"].createElement(_panel["default"], {
        style: (0, _animation.getAddonPanelPosition)(this.animatedValue, previewWidth)
      }, _react["default"].createElement(_addons2["default"], null))), _react["default"].createElement(_navigation["default"], {
        tabOpen: tabOpen,
        onChangeTab: this.handleToggleTab,
        initialUiVisible: !isUIHidden
      }));
    }
  }]);

  return OnDeviceUI;
}(_react.PureComponent);

exports["default"] = OnDeviceUI;