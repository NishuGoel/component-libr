"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.gridWith3Columns = exports.column = exports.row = exports.single = exports.codeError = exports.codeExpanded = exports.codeCollapsed = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Preview = require("./Preview");

var _DocsPage = require("./DocsPage");

var _Button = require("../Button/Button");

var sourceStories = _interopRequireWildcard(require("./Source.stories"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|Preview',
  Component: _Preview.Preview,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1");

var codeCollapsed = function codeCollapsed() {
  return _react["default"].createElement(_Preview.Preview, {
    isExpanded: false,
    withSource: sourceStories.jsx().props
  }, _ref);
};

exports.codeCollapsed = codeCollapsed;
codeCollapsed.displayName = "codeCollapsed";

var _ref2 =
/*#__PURE__*/
_react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1");

var codeExpanded = function codeExpanded() {
  return _react["default"].createElement(_Preview.Preview, {
    isExpanded: true,
    withSource: sourceStories.jsx().props
  }, _ref2);
};

exports.codeExpanded = codeExpanded;
codeExpanded.displayName = "codeExpanded";

var _ref3 =
/*#__PURE__*/
_react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1");

var codeError = function codeError() {
  return _react["default"].createElement(_Preview.Preview, {
    isExpanded: true,
    withSource: sourceStories.sourceUnavailable().props
  }, _ref3);
};

exports.codeError = codeError;
codeError.displayName = "codeError";

var _ref4 =
/*#__PURE__*/
_react["default"].createElement(_Preview.Preview, null, _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1"));

var single = function single() {
  return _ref4;
};

exports.single = single;
single.displayName = "single";

var _ref5 =
/*#__PURE__*/
_react["default"].createElement(_Preview.Preview, null, _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 2"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 3"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 4"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 5"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 6"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 7"));

var row = function row() {
  return _ref5;
};

exports.row = row;
row.displayName = "row";

var _ref6 =
/*#__PURE__*/
_react["default"].createElement(_Preview.Preview, {
  isColumn: true
}, _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 2"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 3"));

var column = function column() {
  return _ref6;
};

exports.column = column;
column.displayName = "column";

var _ref7 =
/*#__PURE__*/
_react["default"].createElement(_Preview.Preview, {
  columns: 3
}, _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 1"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 2"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 3"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 4"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 5"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 6"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 7 long long long long long title"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 8"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 9"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 10"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 11"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 12"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 13"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 14"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 15"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 16"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 17"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 18"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 19"), _react["default"].createElement(_Button.Button, {
  secondary: true
}, "Button 20"));

var gridWith3Columns = function gridWith3Columns() {
  return _ref7;
};

exports.gridWith3Columns = gridWith3Columns;
gridWith3Columns.displayName = "gridWith3Columns";