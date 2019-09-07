"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = renderStringified;

var riot = _interopRequireWildcard(require("riot"));

var _riotCompiler = _interopRequireDefault(require("riot-compiler"));

var _global = require("global");

var _compileStageFunctions = require("../compileStageFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/* eslint-disable import/no-duplicates */
function guessRootName(stringified) {
  var whiteSpaceLocation = stringified.indexOf(' ', stringified.indexOf('<') + 1);
  var firstWhitespace = whiteSpaceLocation === -1 ? stringified.length : whiteSpaceLocation;
  var supposedName = stringified.trim().match(/^<[^ >]+\/>$/) ? stringified.trim().replace(/[<>/]/g, '') : stringified.substring(stringified.indexOf('<') + 1, Math.min(firstWhitespace, stringified.indexOf('>')));

  var matchingBuiltInTag = _global.document.createElement(supposedName).constructor.name;

  return matchingBuiltInTag === 'HTMLUnknownElement' ? supposedName : 'root';
}

function compileText(code, rootName) {
  var sourceCodeEndOfHtml = (Math.min(code.indexOf('<style') + 1, code.indexOf('<script') + 1) || code.length + 1) - 1;
  var sourceCodeReformatted = code.substring(0, sourceCodeEndOfHtml).replace(/[\n\r\s]+/g, ' ') + code.substring(sourceCodeEndOfHtml);
  var sourceCode = rootName === 'root' ? "<root>".concat(sourceCodeReformatted, "</root>") : sourceCodeReformatted;
  return _riotCompiler["default"].compile(sourceCode, {}).replace(_compileStageFunctions.alreadyCompiledMarker, '').trim();
}

function renderStringified(_ref) {
  var tags = _ref.tags,
      _ref$template = _ref.template,
      template = _ref$template === void 0 ? "<".concat((tags[0] || []).boundAs || guessRootName(tags[0] || ''), "/>") : _ref$template,
      tagConstructor = _ref.tagConstructor;
  var tag2 = riot.tag2;
  tags.forEach(function (oneTag) {
    var rootName = oneTag.boundAs || guessRootName(oneTag);

    var _ref2 = oneTag || {},
        content = _ref2.content;

    var code = content ? content.trim() : oneTag || '';
    var compiled = code.indexOf(_compileStageFunctions.alreadyCompiledMarker) !== -1 ? code : compileText(code, rootName);
    (0, riot.unregister)(rootName);
    eval((0, _compileStageFunctions.getRidOfRiotNoise)("".concat(compiled))); // eslint-disable-line no-eval
  });

  var sourceCode = _riotCompiler["default"].compile("<root>".concat(template, "</root>"), {});

  var _final;

  if (tagConstructor) {
    _final = (0, _compileStageFunctions.setConstructor)(sourceCode, tagConstructor);
  } else {
    _final = sourceCode;
  }

  if (template !== '<root/>') {
    eval((0, _compileStageFunctions.getRidOfRiotNoise)(_final)); // eslint-disable-line no-eval
  }

  (0, riot.mount)('*');
}