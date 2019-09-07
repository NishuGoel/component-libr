"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultOptions = _interopRequireDefault(require("./default-options"));

var _parsers = _interopRequireDefault(require("./parsers"));

var _generateHelpers = require("./generate-helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function extendOptions(source, comments, filepath, options) {
  return _objectSpread({}, _defaultOptions.default, {}, options, {
    source,
    comments,
    filepath
  });
}

function inject(source, filepath, options = {}, log = message => {}) {
  const {
    injectDecorator = true,
    injectParameters = true,
    inspectDependencies
  } = options;
  const obviouslyNotCode = ['md', 'txt', 'json'].includes(options.parser);
  let parser = null;

  try {
    parser = (0, _parsers.default)(options.parser);
  } catch (e) {
    log(new Error(`(not fatal, only impacting storysource) Could not load a parser (${e})`));
  }

  if (obviouslyNotCode || !parser) {
    return {
      source,
      storySource: {},
      addsMap: {},
      changed: false,
      dependencies: []
    };
  }

  const ast = parser.parse(source);
  const {
    changed,
    source: cleanedSource,
    comments,
    exportTokenFound
  } = injectDecorator === true ? (0, _generateHelpers.generateSourceWithDecorators)(source, ast, injectParameters) : (0, _generateHelpers.generateSourceWithoutDecorators)(source, ast);
  const storySource = (0, _generateHelpers.generateStorySource)(extendOptions(source, comments, filepath, options));
  const newAst = parser.parse(storySource);
  const {
    dependencies,
    storiesOfIdentifiers
  } = inspectDependencies ? (0, _generateHelpers.generateDependencies)(newAst) : {
    dependencies: [],
    storiesOfIdentifiers: {}
  };
  const {
    addsMap,
    idsToFrameworks
  } = (0, _generateHelpers.generateStoriesLocationsMap)(newAst, storiesOfIdentifiers);
  let newSource = cleanedSource;

  if (exportTokenFound) {
    const cleanedSourceAst = parser.parse(cleanedSource);
    newSource = (0, _generateHelpers.generateSourcesInExportedParameters)(cleanedSource, cleanedSourceAst, {
      source: storySource,
      locationsMap: addsMap
    });
  }

  if (!changed && Object.keys(addsMap || {}).length === 0) {
    return {
      source: newSource,
      storySource,
      addsMap: {},
      changed,
      dependencies,
      idsToFrameworks: idsToFrameworks || {}
    };
  }

  return {
    source: newSource,
    storySource,
    addsMap,
    changed,
    dependencies,
    idsToFrameworks: idsToFrameworks || {}
  };
}

var _default = inject;
exports.default = _default;