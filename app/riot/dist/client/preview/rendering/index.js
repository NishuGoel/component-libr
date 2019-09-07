"use strict";

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _compiledButUnmounted = _interopRequireDefault(require("./compiledButUnmounted"));

var _stringified = _interopRequireDefault(require("./stringified"));

var _raw = _interopRequireDefault(require("./raw"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function render(component) {
  if (typeof component === 'string') {
    (0, _raw["default"])(component);
    return true;
  }

  var _ref = component || {},
      tags = _ref.tags;

  if (Array.isArray(tags)) {
    (0, _stringified["default"])(component);
    return true;
  }

  if (component && component.tagName) {
    (0, _compiledButUnmounted["default"])(component);
    return true;
  }

  if (component && component.length) {
    // already rendered, nothing to do
    return true;
  }

  return false;
}