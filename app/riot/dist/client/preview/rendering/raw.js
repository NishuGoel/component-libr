"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderRaw;

var _riot = require("riot");

var _riotCompiler = _interopRequireDefault(require("riot-compiler"));

var _compileStageFunctions = require("../compileStageFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function renderRaw(sourceCode) {
  var tag2 = _riot.tag2; // eslint-disable-next-line no-eval

  eval((0, _compileStageFunctions.getRidOfRiotNoise)("".concat(_riotCompiler["default"].compile(sourceCode.replace(_compileStageFunctions.alreadyCompiledMarker, '').trim(), {}))));
  (0, _riot.mount)('root', /tag2\s*\(\s*'([^']+)'/.exec(sourceCode)[1], {});
}