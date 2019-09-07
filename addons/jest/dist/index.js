"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.match");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withTests = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _upath = require("upath");

var _shared = require("./shared");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var findTestResults = function findTestResults(testFiles, jestTestResults, jestTestFilesExt) {
  return Object.values(testFiles).map(function (name) {
    var fileName = "".concat(_upath.sep).concat(name).concat(jestTestFilesExt);

    if (jestTestResults && jestTestResults.testResults) {
      var fileNamePattern = new RegExp(fileName);
      return {
        fileName: fileName,
        name: name,
        result: jestTestResults.testResults.find(function (test) {
          return Boolean((0, _upath.normalize)(test.name).match(fileNamePattern));
        })
      };
    }

    return {
      fileName: fileName,
      name: name
    };
  });
};

var emitAddTests = function emitAddTests(_ref) {
  var kind = _ref.kind,
      story = _ref.story,
      testFiles = _ref.testFiles,
      options = _ref.options;

  _addons["default"].getChannel().emit(_shared.ADD_TESTS, {
    kind: kind,
    storyName: story,
    tests: findTestResults(testFiles, options.results, options.filesExt)
  });
};

var withTests = function withTests(userOptions) {
  var defaultOptions = {
    filesExt: '((\\.specs?)|(\\.tests?))?(\\.[jt]sx?)?$'
  };
  var options = Object.assign({}, defaultOptions, {}, userOptions);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (typeof args[0] === 'string') {
      return (0, _utilDeprecate["default"])(function (storyFn, _ref2) {
        var kind = _ref2.kind;
        emitAddTests({
          kind: kind,
          story: storyFn,
          testFiles: args,
          options: options
        });
        return storyFn();
      }, 'Passing component filenames to the `@storybook/addon-jest` via `withTests` is deprecated. Instead, use the `jest` story parameter');
    }

    var storyFn = args[0],
        _args$ = args[1],
        kind = _args$.kind,
        _args$$parameters = _args$.parameters,
        parameters = _args$$parameters === void 0 ? {} : _args$$parameters;
    var testFiles = parameters.jest;

    if (typeof testFiles === 'string') {
      testFiles = [testFiles];
    }

    if (testFiles && Array.isArray(testFiles)) {
      emitAddTests({
        kind: kind,
        story: storyFn,
        testFiles: testFiles,
        options: options
      });
    }

    return storyFn();
  };
};

exports.withTests = withTests;

if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}