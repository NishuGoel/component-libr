"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _EmptyBlock = require("./EmptyBlock");

var _DocsPage = require("./DocsPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  title: 'Docs|EmptyBlock',
  Component: _EmptyBlock.EmptyBlock,
  decorators: [function (getStory) {
    return _react["default"].createElement(_DocsPage.DocsPageWrapper, null, getStory());
  }]
};
exports["default"] = _default;

var _ref =
/*#__PURE__*/
_react["default"].createElement(_EmptyBlock.EmptyBlock, null, "Generic error message");

var error = function error() {
  return _ref;
};

exports.error = error;
error.displayName = "error";