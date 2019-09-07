"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

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

var _button = _interopRequireDefault(require("../navigation/button"));

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
_native["default"].View("flex-direction:row;border-bottom-width:1;border-bottom-color:", function (props) {
  return props.theme.borderColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9hZGRvbnMvbGlzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTzZCIiwiZmlsZSI6Ii4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9hZGRvbnMvbGlzdC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgUHVyZUNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgU2Nyb2xsVmlldyB9IGZyb20gJ3JlYWN0LW5hdGl2ZSc7XHJcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vbmF0aXZlJztcclxuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb25zJztcclxuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi9uYXZpZ2F0aW9uL2J1dHRvbic7XHJcbmltcG9ydCB7IEVtb3Rpb25Qcm9wcyB9IGZyb20gJy4uLy4uL1NoYXJlZC90aGVtZSc7XHJcblxyXG5jb25zdCBDb250YWluZXIgPSBzdHlsZWQuVmlld2BcclxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xyXG4gIGJvcmRlci1ib3R0b20td2lkdGg6IDE7XHJcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogJHsocHJvcHM6IEVtb3Rpb25Qcm9wcykgPT4gcHJvcHMudGhlbWUuYm9yZGVyQ29sb3J9O1xyXG5gO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XHJcbiAgcGFuZWxzOiBDb2xsZWN0aW9uO1xyXG4gIGFkZG9uU2VsZWN0ZWQ6IHN0cmluZztcclxuICBvblByZXNzQWRkb246IChpZDogc3RyaW5nKSA9PiB2b2lkO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBZGRvbkxpc3QgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XHJcbiAgcmVuZGVyVGFiID0gKGlkOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpID0+IHtcclxuICAgIGNvbnN0IHsgYWRkb25TZWxlY3RlZCwgb25QcmVzc0FkZG9uIH0gPSB0aGlzLnByb3BzO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxCdXR0b24gYWN0aXZlPXtpZCA9PT0gYWRkb25TZWxlY3RlZH0ga2V5PXtpZH0gaWQ9e2lkfSBvblByZXNzPXsoKSA9PiBvblByZXNzQWRkb24oaWQpfT5cclxuICAgICAgICB7dGl0bGUudG9VcHBlckNhc2UoKX1cclxuICAgICAgPC9CdXR0b24+XHJcbiAgICApO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgcGFuZWxzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgYWRkb25LZXlzID0gT2JqZWN0LmtleXMocGFuZWxzKTtcclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8Q29udGFpbmVyPlxyXG4gICAgICAgIDxTY3JvbGxWaWV3IHNob3dzSG9yaXpvbnRhbFNjcm9sbEluZGljYXRvcj17ZmFsc2V9IGhvcml6b250YWw+XHJcbiAgICAgICAgICB7YWRkb25LZXlzLm1hcChpZCA9PiB0aGlzLnJlbmRlclRhYihpZCwgcGFuZWxzW2lkXS50aXRsZSkpfVxyXG4gICAgICAgIDwvU2Nyb2xsVmlldz5cclxuICAgICAgPC9Db250YWluZXI+XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0= */"));

var AddonList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AddonList, _PureComponent);

  function AddonList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AddonList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AddonList)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _this.renderTab = function (id, title) {
      var _this$props = _this.props,
          addonSelected = _this$props.addonSelected,
          onPressAddon = _this$props.onPressAddon;
      return _react["default"].createElement(_button["default"], {
        active: id === addonSelected,
        key: id,
        id: id,
        onPress: function onPress() {
          return onPressAddon(id);
        }
      }, title.toUpperCase());
    };

    return _this;
  }

  _createClass(AddonList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var panels = this.props.panels;
      var addonKeys = Object.keys(panels);
      return _react["default"].createElement(Container, null, _react["default"].createElement(_reactNative.ScrollView, {
        showsHorizontalScrollIndicator: false,
        horizontal: true
      }, addonKeys.map(function (id) {
        return _this2.renderTab(id, panels[id].title);
      })));
    }
  }]);

  return AddonList;
}(_react.PureComponent);

exports["default"] = AddonList;