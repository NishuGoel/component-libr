"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.manyItems = exports.singleItem = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _ActionBar = require("./ActionBar");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var action1 = (0, _addonActions.action)('action1');
var action2 = (0, _addonActions.action)('action2');
var action3 = (0, _addonActions.action)('action3');
var _default = {
  Component: _ActionBar.ActionBar,
  title: 'Basics|ActionBar',
  decorators: [function (storyFn) {
    return _react["default"].createElement("div", {
      style: {
        position: 'relative',
        width: '300px',
        height: '64px',
        margin: '1rem',
        background: 'papayawhip',
        border: '1px solid rgba(0,0,0,.05)'
      }
    }, storyFn());
  }]
};
exports["default"] = _default;

var singleItem = function singleItem() {
  return _react["default"].createElement(_ActionBar.ActionBar, {
    actionItems: [{
      title: 'Clear',
      onClick: action1
    }]
  });
};

exports.singleItem = singleItem;
singleItem.displayName = "singleItem";

var _ref =
/*#__PURE__*/
_react["default"].createElement("div", null, "Action node");

var manyItems = function manyItems() {
  return _react["default"].createElement(_ActionBar.ActionBar, {
    actionItems: [{
      title: 'Action string',
      onClick: action1
    }, {
      title: _ref,
      onClick: action2
    }, {
      title: 'Long action string',
      onClick: action3
    }]
  });
};

exports.manyItems = manyItems;
manyItems.displayName = "manyItems";