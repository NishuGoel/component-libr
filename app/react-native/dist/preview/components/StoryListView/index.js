"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.some");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.create");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _native = _interopRequireDefault(require("@emotion/native"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _text = require("../Shared/text");

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

var SearchBar =
/*#__PURE__*/
_native["default"].TextInput("background:", function (props) {
  return props.theme.borderColor;
}, ";color:", function (props) {
  return props.theme.buttonActiveTextColor;
}, ";border-top-left-radius:5;border-top-right-radius:5;border-bottom-left-radius:5;border-bottom-right-radius:5;font-size:16;margin-horizontal:5;margin-vertical:5;padding-horizontal:5;padding-vertical:5;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvU3RvcnlMaXN0Vmlldy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUW9EIiwiZmlsZSI6Ii4uLy4uLy4uLy4uL3NyYy9wcmV2aWV3L2NvbXBvbmVudHMvU3RvcnlMaXN0Vmlldy9pbmRleC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBTZWN0aW9uTGlzdCwgVGV4dElucHV0LCBUb3VjaGFibGVPcGFjaXR5LCBWaWV3LCBTYWZlQXJlYVZpZXcgfSBmcm9tICdyZWFjdC1uYXRpdmUnO1xyXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL25hdGl2ZSc7XHJcbmltcG9ydCBFdmVudHMgZnJvbSAnQHN0b3J5Ym9vay9jb3JlLWV2ZW50cyc7XHJcbmltcG9ydCBhZGRvbnMgZnJvbSAnQHN0b3J5Ym9vay9hZGRvbnMnO1xyXG5pbXBvcnQgeyBFbW90aW9uUHJvcHMgfSBmcm9tICcuLi9TaGFyZWQvdGhlbWUnO1xyXG5pbXBvcnQgeyBIZWFkZXIsIE5hbWUgfSBmcm9tICcuLi9TaGFyZWQvdGV4dCc7XHJcblxyXG5jb25zdCBTZWFyY2hCYXI6IHR5cGVvZiBUZXh0SW5wdXQgPSBzdHlsZWQuVGV4dElucHV0YFxyXG4gIGJhY2tncm91bmQ6ICR7KHByb3BzOiBFbW90aW9uUHJvcHMpID0+IHByb3BzLnRoZW1lLmJvcmRlckNvbG9yfTtcclxuICBjb2xvcjogJHsocHJvcHM6IEVtb3Rpb25Qcm9wcykgPT4gcHJvcHMudGhlbWUuYnV0dG9uQWN0aXZlVGV4dENvbG9yfTtcclxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiA1O1xyXG4gIGJvcmRlci10b3AtcmlnaHQtcmFkaXVzOiA1O1xyXG4gIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDU7XHJcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDU7XHJcbiAgZm9udC1zaXplOiAxNjtcclxuICBtYXJnaW4taG9yaXpvbnRhbDogNTtcclxuICBtYXJnaW4tdmVydGljYWw6IDU7XHJcbiAgcGFkZGluZy1ob3Jpem9udGFsOiA1O1xyXG4gIHBhZGRpbmctdmVydGljYWw6IDU7XHJcbmA7XHJcblxyXG5jb25zdCBIZWFkZXJDb250YWluZXIgPSBzdHlsZWQuVmlld2BcclxuICBwYWRkaW5nLXZlcnRpY2FsOiA1O1xyXG5gO1xyXG5cclxuaW50ZXJmYWNlIFNlY3Rpb25Qcm9wcyB7XHJcbiAgdGl0bGU6IHN0cmluZztcclxuICBzZWxlY3RlZDogYm9vbGVhbjtcclxufVxyXG5cclxuY29uc3QgU2VjdGlvbkhlYWRlcjogUmVhY3QuRnVuY3Rpb25Db21wb25lbnQ8U2VjdGlvblByb3BzPiA9ICh7XHJcbiAgdGl0bGUsXHJcbiAgc2VsZWN0ZWQsXHJcbn06IFNlY3Rpb25Qcm9wcykgPT4gKFxyXG4gIDxIZWFkZXJDb250YWluZXIga2V5PXt0aXRsZX0+XHJcbiAgICA8SGVhZGVyIHNlbGVjdGVkPXtzZWxlY3RlZH0+e3RpdGxlfTwvSGVhZGVyPlxyXG4gIDwvSGVhZGVyQ29udGFpbmVyPlxyXG4pO1xyXG5cclxuaW50ZXJmYWNlIExpc3RJdGVtUHJvcHMge1xyXG4gIHRpdGxlOiBzdHJpbmc7XHJcbiAga2luZDogc3RyaW5nO1xyXG4gIHNlbGVjdGVkOiBib29sZWFuO1xyXG4gIG9uUHJlc3M6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmNvbnN0IEl0ZW1Ub3VjaGFibGU6IHR5cGVvZiBUb3VjaGFibGVPcGFjaXR5ID0gc3R5bGVkLlRvdWNoYWJsZU9wYWNpdHlgXHJcbiAgcGFkZGluZy1ob3Jpem9udGFsOiAxNjtcclxuICBwYWRkaW5nLXZlcnRpY2FsOiA1O1xyXG5gO1xyXG5cclxuY29uc3QgTGlzdEl0ZW06IFJlYWN0LkZ1bmN0aW9uQ29tcG9uZW50PExpc3RJdGVtUHJvcHM+ID0gKHsga2luZCwgdGl0bGUsIHNlbGVjdGVkLCBvblByZXNzIH0pID0+IChcclxuICA8SXRlbVRvdWNoYWJsZVxyXG4gICAga2V5PXt0aXRsZX1cclxuICAgIG9uUHJlc3M9e29uUHJlc3N9XHJcbiAgICBhY3RpdmVPcGFjaXR5PXswLjh9XHJcbiAgICB0ZXN0SUQ9e2BTdG9yeWJvb2suTGlzdEl0ZW0uJHtraW5kfS4ke3RpdGxlfWB9XHJcbiAgICBhY2Nlc3NpYmlsaXR5TGFiZWw9e2BTdG9yeWJvb2suTGlzdEl0ZW0uJHt0aXRsZX1gfVxyXG4gID5cclxuICAgIDxOYW1lIHNlbGVjdGVkPXtzZWxlY3RlZH0+e3RpdGxlfTwvTmFtZT5cclxuICA8L0l0ZW1Ub3VjaGFibGU+XHJcbik7XHJcblxyXG5pbnRlcmZhY2UgUHJvcHMge1xyXG4gIHN0b3JpZXM6IGFueTtcclxufVxyXG5cclxuaW50ZXJmYWNlIFN0YXRlIHtcclxuICBkYXRhOiBhbnlbXTtcclxuICBvcmlnaW5hbERhdGE6IGFueVtdO1xyXG59XHJcblxyXG5jb25zdCBMaXN0OiB0eXBlb2YgU2VjdGlvbkxpc3QgPSBzdHlsZWQuU2VjdGlvbkxpc3RgXHJcbiAgZmxleDogMTtcclxuICBtYXJnaW4tYm90dG9tOiA0MDtcclxuYDtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RvcnlMaXN0VmlldyBleHRlbmRzIENvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcclxuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICBkYXRhOiBbXSxcclxuICAgICAgb3JpZ2luYWxEYXRhOiBbXSxcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgIGNvbnN0IGNoYW5uZWwgPSBhZGRvbnMuZ2V0Q2hhbm5lbCgpO1xyXG4gICAgY2hhbm5lbC5vbihFdmVudHMuU1RPUllfQURERUQsIHRoaXMuaGFuZGxlU3RvcnlBZGRlZCk7XHJcbiAgICBjaGFubmVsLm9uKEV2ZW50cy5TRUxFQ1RfU1RPUlksIHRoaXMuZm9yY2VSZVJlbmRlcik7XHJcbiAgICB0aGlzLmhhbmRsZVN0b3J5QWRkZWQoKTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgY29uc3QgY2hhbm5lbCA9IGFkZG9ucy5nZXRDaGFubmVsKCk7XHJcbiAgICBjaGFubmVsLnJlbW92ZUxpc3RlbmVyKEV2ZW50cy5TVE9SWV9BRERFRCwgdGhpcy5oYW5kbGVTdG9yeUFkZGVkKTtcclxuICAgIGNoYW5uZWwucmVtb3ZlTGlzdGVuZXIoRXZlbnRzLlNFTEVDVF9TVE9SWSwgdGhpcy5mb3JjZVJlUmVuZGVyKTtcclxuICB9XHJcblxyXG4gIGZvcmNlUmVSZW5kZXIgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZvcmNlVXBkYXRlKCk7XHJcbiAgfTtcclxuXHJcbiAgaGFuZGxlU3RvcnlBZGRlZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHsgc3RvcmllcyB9ID0gdGhpcy5wcm9wcztcclxuXHJcbiAgICBpZiAoc3Rvcmllcykge1xyXG4gICAgICBjb25zdCBkYXRhID0gT2JqZWN0LnZhbHVlcyhcclxuICAgICAgICBzdG9yaWVzXHJcbiAgICAgICAgICAucmF3KClcclxuICAgICAgICAgIC5yZWR1Y2UoKGFjYzogeyBba2luZDogc3RyaW5nXTogeyB0aXRsZTogc3RyaW5nOyBkYXRhOiBhbnlbXSB9IH0sIHN0b3J5OiBhbnkpID0+IHtcclxuICAgICAgICAgICAgYWNjW3N0b3J5LmtpbmRdID0ge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiBzdG9yeS5raW5kLFxyXG4gICAgICAgICAgICAgIGRhdGE6IChhY2Nbc3Rvcnkua2luZF0gPyBhY2Nbc3Rvcnkua2luZF0uZGF0YSA6IFtdKS5jb25jYXQoc3RvcnkpLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGFjYztcclxuICAgICAgICAgIH0sIHt9KVxyXG4gICAgICApO1xyXG5cclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGEsIG9yaWdpbmFsRGF0YTogZGF0YSB9KTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBoYW5kbGVDaGFuZ2VTZWFyY2hUZXh0ID0gKHRleHQ6IHN0cmluZykgPT4ge1xyXG4gICAgY29uc3QgcXVlcnkgPSB0ZXh0LnRyaW0oKTtcclxuICAgIGNvbnN0IHsgb3JpZ2luYWxEYXRhOiBkYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIGlmICghcXVlcnkpIHtcclxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGEgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjaGVja1ZhbHVlID0gKHZhbHVlOiBzdHJpbmcpID0+IHZhbHVlLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMocXVlcnkudG9Mb3dlckNhc2UoKSk7XHJcbiAgICBjb25zdCBmaWx0ZXJlZERhdGEgPSBkYXRhLnJlZHVjZSgoYWNjLCBzdG9yeSkgPT4ge1xyXG4gICAgICBjb25zdCBoYXNUaXRsZSA9IGNoZWNrVmFsdWUoc3RvcnkudGl0bGUpO1xyXG4gICAgICBjb25zdCBoYXNLaW5kID0gc3RvcnkuZGF0YS5zb21lKChyZWY6IGFueSkgPT4gY2hlY2tWYWx1ZShyZWYubmFtZSkpO1xyXG5cclxuICAgICAgaWYgKGhhc1RpdGxlIHx8IGhhc0tpbmQpIHtcclxuICAgICAgICBhY2MucHVzaCh7XHJcbiAgICAgICAgICAuLi5zdG9yeSxcclxuICAgICAgICAgIC8vIGluIGNhc2UgdGhlIHF1ZXJ5IG1hdGNoZXMgY29tcG9uZW50J3MgdGl0bGUsIGFsbCBvZiBpdHMgc3RvcmllcyB3aWxsIGJlIHNob3duXHJcbiAgICAgICAgICBkYXRhOiAhaGFzVGl0bGUgPyBzdG9yeS5kYXRhLmZpbHRlcigocmVmOiBhbnkpID0+IGNoZWNrVmFsdWUocmVmLm5hbWUpKSA6IHN0b3J5LmRhdGEsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiBhY2M7XHJcbiAgICB9LCBbXSk7XHJcblxyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IGRhdGE6IGZpbHRlcmVkRGF0YSB9KTtcclxuICB9O1xyXG5cclxuICBjaGFuZ2VTdG9yeShzdG9yeUlkOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGNoYW5uZWwgPSBhZGRvbnMuZ2V0Q2hhbm5lbCgpO1xyXG4gICAgY2hhbm5lbC5lbWl0KEV2ZW50cy5TRVRfQ1VSUkVOVF9TVE9SWSwgeyBzdG9yeUlkIH0pO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgeyBzdG9yaWVzIH0gPSB0aGlzLnByb3BzO1xyXG4gICAgY29uc3QgeyBzdG9yeUlkIH0gPSBzdG9yaWVzLmdldFNlbGVjdGlvbigpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRTdG9yeSA9IHN0b3JpZXMuZnJvbUlkKHN0b3J5SWQpO1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSB0aGlzLnN0YXRlO1xyXG5cclxuICAgIHJldHVybiAoXHJcbiAgICAgIDxTYWZlQXJlYVZpZXcgc3R5bGU9e3sgZmxleDogMSB9fT5cclxuICAgICAgICA8U2VhcmNoQmFyXHJcbiAgICAgICAgICB0ZXN0SUQ9XCJTdG9yeWJvb2suTGlzdFZpZXcuU2VhcmNoQmFyXCJcclxuICAgICAgICAgIGNsZWFyQnV0dG9uTW9kZT1cIndoaWxlLWVkaXRpbmdcIlxyXG4gICAgICAgICAgZGlzYWJsZUZ1bGxzY3JlZW5VSVxyXG4gICAgICAgICAgb25DaGFuZ2VUZXh0PXt0aGlzLmhhbmRsZUNoYW5nZVNlYXJjaFRleHR9XHJcbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIkZpbHRlclwiXHJcbiAgICAgICAgICByZXR1cm5LZXlUeXBlPVwic2VhcmNoXCJcclxuICAgICAgICAvPlxyXG4gICAgICAgIDxMaXN0XHJcbiAgICAgICAgICB0ZXN0SUQ9XCJTdG9yeWJvb2suTGlzdFZpZXdcIlxyXG4gICAgICAgICAgcmVuZGVySXRlbT17KHsgaXRlbSB9KSA9PiAoXHJcbiAgICAgICAgICAgIDxMaXN0SXRlbVxyXG4gICAgICAgICAgICAgIHRpdGxlPXtpdGVtLm5hbWV9XHJcbiAgICAgICAgICAgICAga2luZD17aXRlbS5raW5kfVxyXG4gICAgICAgICAgICAgIHNlbGVjdGVkPXtzZWxlY3RlZFN0b3J5ICYmIGl0ZW0uaWQgPT09IHNlbGVjdGVkU3RvcnkuaWR9XHJcbiAgICAgICAgICAgICAgb25QcmVzcz17KCkgPT4gdGhpcy5jaGFuZ2VTdG9yeShpdGVtLmlkKX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgICl9XHJcbiAgICAgICAgICByZW5kZXJTZWN0aW9uSGVhZGVyPXsoeyBzZWN0aW9uOiB7IHRpdGxlIH0gfSkgPT4gKFxyXG4gICAgICAgICAgICA8U2VjdGlvbkhlYWRlciB0aXRsZT17dGl0bGV9IHNlbGVjdGVkPXtzZWxlY3RlZFN0b3J5ICYmIHRpdGxlID09PSBzZWxlY3RlZFN0b3J5LmtpbmR9IC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgICAga2V5RXh0cmFjdG9yPXsoaXRlbSwgaW5kZXgpID0+IGl0ZW0gKyBpbmRleH1cclxuICAgICAgICAgIHNlY3Rpb25zPXtkYXRhfVxyXG4gICAgICAgICAgc3RpY2t5U2VjdGlvbkhlYWRlcnNFbmFibGVkPXtmYWxzZX1cclxuICAgICAgICAvPlxyXG4gICAgICA8L1NhZmVBcmVhVmlldz5cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ== */"));

var HeaderContainer =
/*#__PURE__*/
_native["default"].View("padding-vertical:5;");

var SectionHeader = function SectionHeader(_ref) {
  var title = _ref.title,
      selected = _ref.selected;
  return _react["default"].createElement(HeaderContainer, {
    key: title
  }, _react["default"].createElement(_text.Header, {
    selected: selected
  }, title));
};

var ItemTouchable =
/*#__PURE__*/
_native["default"].TouchableOpacity("padding-horizontal:16;padding-vertical:5;");

var ListItem = function ListItem(_ref2) {
  var kind = _ref2.kind,
      title = _ref2.title,
      selected = _ref2.selected,
      onPress = _ref2.onPress;
  return _react["default"].createElement(ItemTouchable, {
    key: title,
    onPress: onPress,
    activeOpacity: 0.8,
    testID: "Storybook.ListItem.".concat(kind, ".").concat(title),
    accessibilityLabel: "Storybook.ListItem.".concat(title)
  }, _react["default"].createElement(_text.Name, {
    selected: selected
  }, title));
};

var List =
/*#__PURE__*/
_native["default"].SectionList("flex:1;margin-bottom:40;");

var StoryListView =
/*#__PURE__*/
function (_Component) {
  _inherits(StoryListView, _Component);

  function StoryListView(props) {
    var _this;

    _classCallCheck(this, StoryListView);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(StoryListView).call(this, props));

    _this.forceReRender = function () {
      _this.forceUpdate();
    };

    _this.handleStoryAdded = function () {
      var stories = _this.props.stories;

      if (stories) {
        var data = Object.values(stories.raw().reduce(function (acc, story) {
          acc[story.kind] = {
            title: story.kind,
            data: (acc[story.kind] ? acc[story.kind].data : []).concat(story)
          };
          return acc;
        }, {}));

        _this.setState({
          data: data,
          originalData: data
        });
      }
    };

    _this.handleChangeSearchText = function (text) {
      var query = text.trim();
      var data = _this.state.originalData;

      if (!query) {
        _this.setState({
          data: data
        });

        return;
      }

      var checkValue = function checkValue(value) {
        return value.toLowerCase().includes(query.toLowerCase());
      };

      var filteredData = data.reduce(function (acc, story) {
        var hasTitle = checkValue(story.title);
        var hasKind = story.data.some(function (ref) {
          return checkValue(ref.name);
        });

        if (hasTitle || hasKind) {
          acc.push(Object.assign({}, story, {
            // in case the query matches component's title, all of its stories will be shown
            data: !hasTitle ? story.data.filter(function (ref) {
              return checkValue(ref.name);
            }) : story.data
          }));
        }

        return acc;
      }, []);

      _this.setState({
        data: filteredData
      });
    };

    _this.state = {
      data: [],
      originalData: []
    };
    return _this;
  }

  _createClass(StoryListView, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var channel = _addons["default"].getChannel();

      channel.on(_coreEvents["default"].STORY_ADDED, this.handleStoryAdded);
      channel.on(_coreEvents["default"].SELECT_STORY, this.forceReRender);
      this.handleStoryAdded();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var channel = _addons["default"].getChannel();

      channel.removeListener(_coreEvents["default"].STORY_ADDED, this.handleStoryAdded);
      channel.removeListener(_coreEvents["default"].SELECT_STORY, this.forceReRender);
    }
  }, {
    key: "changeStory",
    value: function changeStory(storyId) {
      var channel = _addons["default"].getChannel();

      channel.emit(_coreEvents["default"].SET_CURRENT_STORY, {
        storyId: storyId
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var stories = this.props.stories;

      var _stories$getSelection = stories.getSelection(),
          storyId = _stories$getSelection.storyId;

      var selectedStory = stories.fromId(storyId);
      var data = this.state.data;
      return _react["default"].createElement(_reactNative.SafeAreaView, {
        style: {
          flex: 1
        }
      }, _react["default"].createElement(SearchBar, {
        testID: "Storybook.ListView.SearchBar",
        clearButtonMode: "while-editing",
        disableFullscreenUI: true,
        onChangeText: this.handleChangeSearchText,
        placeholder: "Filter",
        returnKeyType: "search"
      }), _react["default"].createElement(List, {
        testID: "Storybook.ListView",
        renderItem: function renderItem(_ref3) {
          var item = _ref3.item;
          return _react["default"].createElement(ListItem, {
            title: item.name,
            kind: item.kind,
            selected: selectedStory && item.id === selectedStory.id,
            onPress: function onPress() {
              return _this2.changeStory(item.id);
            }
          });
        },
        renderSectionHeader: function renderSectionHeader(_ref4) {
          var title = _ref4.section.title;
          return _react["default"].createElement(SectionHeader, {
            title: title,
            selected: selectedStory && title === selectedStory.kind
          });
        },
        keyExtractor: function keyExtractor(item, index) {
          return item + index;
        },
        sections: data,
        stickySectionHeadersEnabled: false
      }));
    }
  }]);

  return StoryListView;
}(_react.Component);

exports["default"] = StoryListView;