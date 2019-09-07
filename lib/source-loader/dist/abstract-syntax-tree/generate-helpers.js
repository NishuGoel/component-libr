"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateSourceWithDecorators = generateSourceWithDecorators;
exports.generateSourceWithoutDecorators = generateSourceWithoutDecorators;
exports.generateAddsMap = generateAddsMap;
exports.generateStoriesLocationsMap = generateStoriesLocationsMap;
exports.generateDependencies = generateDependencies;
exports.generateStorySource = generateStorySource;
exports.generateSourcesInExportedParameters = generateSourcesInExportedParameters;

var _parseHelpers = require("./parse-helpers");

var _parsers = _interopRequireDefault(require("./parsers"));

var _traverseHelpers = require("./traverse-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isUglyComment(comment, uglyCommentsRegex) {
  return uglyCommentsRegex.some(regex => regex.test(comment));
}

function generateSourceWithoutUglyComments(source, {
  comments,
  uglyCommentsRegex
}) {
  let lastIndex = 0;
  const parts = [source];
  comments.filter(comment => isUglyComment(comment.value.trim(), uglyCommentsRegex)).map(_parseHelpers.patchNode).forEach(comment => {
    parts.pop();
    const start = source.slice(lastIndex, comment.start);
    const end = source.slice(comment.end);
    parts.push(start, end);
    lastIndex = comment.end;
  });
  return parts.join('');
}

function prettifyCode(source, {
  prettierConfig,
  parser,
  filepath
}) {
  let config = prettierConfig;
  let foundParser = null;
  if (parser === 'flow') foundParser = 'flow';
  if (parser === 'javascript' || /jsx?/.test(parser)) foundParser = 'javascript';
  if (parser === 'typescript' || /tsx?/.test(parser)) foundParser = 'typescript';

  if (!config.parser) {
    config = _objectSpread({}, prettierConfig);
  } else if (filepath) {
    config = _objectSpread({}, prettierConfig, {
      filepath
    });
  } else {
    config = _objectSpread({}, prettierConfig);
  }

  try {
    return (0, _parsers.default)(foundParser || 'javascript').format(source, config);
  } catch (e) {
    // Can fail when the source is a JSON
    return source;
  }
}

const STORY_DECORATOR_STATEMENT = '.addDecorator(withSourceLoader(__STORY__, __ADDS_MAP__,__MAIN_FILE_LOCATION__,__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__))';
const ADD_PARAMETERS_STATEMENT = '.addParameters({ storySource: { source: __STORY__, locationsMap: __ADDS_MAP__ } })';
const IMPORT_DECLARATION_FOR_EXPORTED_STORIES_DECORATOR = 'var addSourceDecorator = require("@storybook/source-loader/dist/preview").addSource;\n';

const applyExportDecoratorStatement = part => ` addSourceDecorator(${part}, {__STORY__, __ADDS_MAP__,__MAIN_FILE_LOCATION__,__MODULE_DEPENDENCIES__,__LOCAL_DEPENDENCIES__,__SOURCE_PREFIX__,__IDS_TO_FRAMEWORKS__});`;

function generateSourceWithDecorators(source, ast, withParameters) {
  const {
    comments = []
  } = ast;
  const partsUsingStoryOfToken = (0, _traverseHelpers.splitSTORYOF)(ast, source);

  if (partsUsingStoryOfToken.length > 1) {
    const newSource = partsUsingStoryOfToken.join((withParameters ? ADD_PARAMETERS_STATEMENT : '') + STORY_DECORATOR_STATEMENT);
    return {
      storyOfTokenFound: true,
      changed: partsUsingStoryOfToken.length > 1,
      source: newSource,
      comments
    };
  }

  const partsUsingExports = (0, _traverseHelpers.splitExports)(ast, source);
  const newSource = IMPORT_DECLARATION_FOR_EXPORTED_STORIES_DECORATOR + partsUsingExports.map((part, i) => i % 2 === 0 ? part : applyExportDecoratorStatement(part)).join('');
  return {
    exportTokenFound: true,
    changed: partsUsingExports.length > 1,
    source: newSource,
    comments
  };
}

function generateSourceWithoutDecorators(source, ast) {
  const {
    comments = []
  } = ast;
  return {
    changed: true,
    source,
    comments
  };
}

function generateAddsMap(ast, storiesOfIdentifiers) {
  return (0, _traverseHelpers.findAddsMap)(ast, storiesOfIdentifiers);
}

function generateStoriesLocationsMap(ast, storiesOfIdentifiers) {
  const usingAddsMap = generateAddsMap(ast, storiesOfIdentifiers);
  const {
    addsMap
  } = usingAddsMap;

  if (Object.keys(addsMap).length > 0) {
    return usingAddsMap;
  }

  const usingExportsMap = (0, _traverseHelpers.findExportsMap)(ast);
  return usingExportsMap || usingAddsMap;
}

function generateDependencies(ast) {
  return (0, _traverseHelpers.findDependencies)(ast);
}

function generateStorySource(_ref) {
  let {
    source
  } = _ref,
      options = _objectWithoutProperties(_ref, ["source"]);

  let storySource = source;
  storySource = generateSourceWithoutUglyComments(storySource, options);
  storySource = prettifyCode(storySource, options);
  return storySource;
}

function generateSourcesInExportedParameters(source, ast, additionalParameters) {
  const {
    splicedSource,
    parametersSliceOfCode,
    indexWhereToAppend,
    foundParametersProperty
  } = (0, _traverseHelpers.popParametersObjectFromDefaultExport)(source, ast);

  if (indexWhereToAppend !== -1) {
    const additionalParametersAsJson = JSON.stringify({
      storySource: additionalParameters
    }).slice(0, -1);
    const propertyDeclaration = foundParametersProperty ? '' : 'parameters: ';
    const comma = foundParametersProperty ? '' : ',';
    const newParameters = `${propertyDeclaration}${additionalParametersAsJson},${parametersSliceOfCode.substring(1)}${comma}`;
    const result = splicedSource.substring(0, indexWhereToAppend) + newParameters + splicedSource.substring(indexWhereToAppend);
    return result;
  }

  return source;
}