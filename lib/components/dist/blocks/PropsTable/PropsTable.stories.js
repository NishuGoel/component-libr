"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normal = exports.empty = exports.error = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _PropsTable = require("./PropsTable");

var _DocsPage = require("../DocsPage");

var _PropRow = require("./PropRow.stories");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Component: _PropsTable.PropsTable,
  title: 'Docs|PropTable',
  decorators: [function (storyFn) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, storyFn());
  }]
};
exports["default"] = _default;

var error = function error() {
  return _react["default"].createElement(_PropsTable.PropsTable, {
    error: _PropsTable.PropsTableError.NO_COMPONENT
  });
};

exports.error = error;
error.displayName = "error";

var empty = function empty() {
  return _react["default"].createElement(_PropsTable.PropsTable, {
    rows: []
  });
};

exports.empty = empty;
empty.displayName = "empty";

var _ref =
/*#__PURE__*/
_react["default"].createElement(_PropsTable.PropsTable, {
  rows: [_PropRow.stringDef, _PropRow.numberDef]
});

var normal = function normal() {
  return _ref;
};

exports.normal = normal;
normal.displayName = "normal";