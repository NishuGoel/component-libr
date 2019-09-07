"use strict";

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asCompiledCode = asCompiledCode;
exports.compileNow = compileNow;
exports.getRidOfRiotNoise = getRidOfRiotNoise;
exports.setConstructor = setConstructor;
exports.alreadyCompiledMarker = void 0;

var _riotCompiler = _interopRequireDefault(require("riot-compiler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var alreadyCompiledMarker = "var riot = require('riot')";
exports.alreadyCompiledMarker = alreadyCompiledMarker;

function asCompiledCode(text) {
  return _riotCompiler["default"].compile(text, {}).replace('var riot = require("riot")', '').replace('riot.tag2(', 'tag2(');
}

function compileNow(tag2, text) {
  // eslint-disable-next-line no-eval
  return tag2 && eval(asCompiledCode(text));
}

function getRidOfRiotNoise(compiled) {
  return compiled.replace(/riot\.tag2/g, 'tag2').replace(alreadyCompiledMarker, '');
}

function setConstructor(compiledSourceCode, constructor) {
  return compiledSourceCode.replace(/function\(opts\)\s*{\s*}(?=\);$)/, constructor.toString());
}