"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

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

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _list = _interopRequireDefault(require("./list"));

var _wrapper = _interopRequireDefault(require("./wrapper"));

var _text = require("../../Shared/text");

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

var NoAddonContainer =
/*#__PURE__*/
_native["default"].View("flex:1;align-items:center;justify-content:center;");

var Container =
/*#__PURE__*/
_native["default"].View("flex:1;background:", function (props) {
  return props.theme.backgroundColor;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvT25EZXZpY2VVSS9hZGRvbnMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWM2QiIsImZpbGUiOiIuLi8uLi8uLi8uLi8uLi9zcmMvcHJldmlldy9jb21wb25lbnRzL09uRGV2aWNlVUkvYWRkb25zL2luZGV4LnRzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBQdXJlQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL25hdGl2ZSc7XHJcbmltcG9ydCBhZGRvbnMgZnJvbSAnQHN0b3J5Ym9vay9hZGRvbnMnO1xyXG5pbXBvcnQgQWRkb25zTGlzdCBmcm9tICcuL2xpc3QnO1xyXG5pbXBvcnQgQWRkb25XcmFwcGVyIGZyb20gJy4vd3JhcHBlcic7XHJcbmltcG9ydCB7IExhYmVsIH0gZnJvbSAnLi4vLi4vU2hhcmVkL3RleHQnO1xyXG5pbXBvcnQgeyBFbW90aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9TaGFyZWQvdGhlbWUnO1xyXG5cclxuY29uc3QgTm9BZGRvbkNvbnRhaW5lciA9IHN0eWxlZC5WaWV3YFxyXG4gIGZsZXg6IDE7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuYDtcclxuXHJcbmNvbnN0IENvbnRhaW5lciA9IHN0eWxlZC5WaWV3YFxyXG4gIGZsZXg6IDE7XHJcbiAgYmFja2dyb3VuZDogJHsocHJvcHM6IEVtb3Rpb25Qcm9wcykgPT4gcHJvcHMudGhlbWUuYmFja2dyb3VuZENvbG9yfTtcclxuYDtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZG9ucyBleHRlbmRzIFB1cmVDb21wb25lbnQ8e30sIHsgYWRkb25TZWxlY3RlZDogc3RyaW5nIH0+IHtcclxuICBwYW5lbHMgPSBhZGRvbnMuZ2V0RWxlbWVudHMoJ3BhbmVsJyk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByb3BzOiB7fSkge1xyXG4gICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIGFkZG9uU2VsZWN0ZWQ6IE9iamVjdC5rZXlzKHRoaXMucGFuZWxzKVswXSB8fCBudWxsLFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIG9uUHJlc3NBZGRvbiA9IChhZGRvblNlbGVjdGVkOiBzdHJpbmcpID0+IHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyBhZGRvblNlbGVjdGVkIH0pO1xyXG4gIH07XHJcblxyXG4gIHJlbmRlcigpIHtcclxuICAgIGNvbnN0IHsgYWRkb25TZWxlY3RlZCB9ID0gdGhpcy5zdGF0ZTtcclxuXHJcbiAgICBpZiAoT2JqZWN0LmtleXModGhpcy5wYW5lbHMpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICByZXR1cm4gKFxyXG4gICAgICAgIDxOb0FkZG9uQ29udGFpbmVyPlxyXG4gICAgICAgICAgPExhYmVsPk5vIGFkZG9ucyBsb2FkZWQuPC9MYWJlbD5cclxuICAgICAgICA8L05vQWRkb25Db250YWluZXI+XHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIChcclxuICAgICAgPENvbnRhaW5lcj5cclxuICAgICAgICA8QWRkb25zTGlzdFxyXG4gICAgICAgICAgb25QcmVzc0FkZG9uPXt0aGlzLm9uUHJlc3NBZGRvbn1cclxuICAgICAgICAgIHBhbmVscz17dGhpcy5wYW5lbHN9XHJcbiAgICAgICAgICBhZGRvblNlbGVjdGVkPXthZGRvblNlbGVjdGVkfVxyXG4gICAgICAgIC8+XHJcbiAgICAgICAgPEFkZG9uV3JhcHBlciBhZGRvblNlbGVjdGVkPXthZGRvblNlbGVjdGVkfSBwYW5lbHM9e3RoaXMucGFuZWxzfSAvPlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"));

var Addons =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(Addons, _PureComponent);

  function Addons(props) {
    var _this;

    _classCallCheck(this, Addons);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Addons).call(this, props));
    _this.panels = _addons["default"].getElements('panel');

    _this.onPressAddon = function (addonSelected) {
      _this.setState({
        addonSelected: addonSelected
      });
    };

    _this.state = {
      addonSelected: Object.keys(_this.panels)[0] || null
    };
    return _this;
  }

  _createClass(Addons, [{
    key: "render",
    value: function render() {
      var addonSelected = this.state.addonSelected;

      if (Object.keys(this.panels).length === 0) {
        return _react["default"].createElement(NoAddonContainer, null, _react["default"].createElement(_text.Label, null, "No addons loaded."));
      }

      return _react["default"].createElement(Container, null, _react["default"].createElement(_list["default"], {
        onPressAddon: this.onPressAddon,
        panels: this.panels,
        addonSelected: addonSelected
      }), _react["default"].createElement(_wrapper["default"], {
        addonSelected: addonSelected,
        panels: this.panels
      }));
    }
  }]);

  return Addons;
}(_react.PureComponent);

exports["default"] = Addons;