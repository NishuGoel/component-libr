"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Description = void 0;

var _react = _interopRequireDefault(require("react"));

var _markdownToJsx = _interopRequireDefault(require("markdown-to-jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * A markdown description for a component, typically used to show the
 * components docgen docs.
 */
var Description = function Description(_ref) {
  var markdown = _ref.markdown;
  return _react["default"].createElement(_markdownToJsx["default"], {
    options: {
      forceBlock: true
    }
  }, markdown);
};

exports.Description = Description;
Description.displayName = "Description";