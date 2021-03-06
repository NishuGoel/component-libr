"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "INITIAL_VIEWPORTS", {
  enumerable: true,
  get: function get() {
    return _defaults.INITIAL_VIEWPORTS;
  }
});
Object.defineProperty(exports, "DEFAULT_VIEWPORT", {
  enumerable: true,
  get: function get() {
    return _defaults.DEFAULT_VIEWPORT;
  }
});
exports.configureViewport = void 0;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _defaults = require("../defaults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var configureViewport = (0, _utilDeprecate["default"])(function () {}, 'configureViewport is no longer supported, use .addParameters({ viewport }) instead');
exports.configureViewport = configureViewport;