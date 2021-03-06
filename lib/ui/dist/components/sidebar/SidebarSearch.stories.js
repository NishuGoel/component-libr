"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filledIn = exports.focussed = exports.simple = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _SidebarSearch = _interopRequireWildcard(require("./SidebarSearch"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  Component: _SidebarSearch["default"],
  title: 'UI|Sidebar/SidebarSearch',
  decorators: [function (storyFn) {
    return _react["default"].createElement("div", {
      style: {
        width: '240px',
        margin: '1rem',
        padding: '1rem',
        background: '#999'
      }
    }, storyFn());
  }]
};
exports["default"] = _default;
var actions = (0, _addonActions.actions)('onChange');
var pureActions = Object.assign({}, actions, {}, (0, _addonActions.actions)('onSetFocussed'));

var simple = function simple() {
  return _react["default"].createElement(_SidebarSearch["default"], actions);
};

exports.simple = simple;
simple.displayName = "simple";

var focussed = function focussed() {
  return _react["default"].createElement(_SidebarSearch.PureSidebarSearch, _extends({
    focussed: true
  }, pureActions));
};

exports.focussed = focussed;
focussed.displayName = "focussed";

var filledIn = function filledIn() {
  return _react["default"].createElement(_SidebarSearch.PureSidebarSearch, _extends({
    focussed: true,
    defaultValue: "Searchstring"
  }, pureActions));
};

exports.filledIn = filledIn;
filledIn.displayName = "filledIn";