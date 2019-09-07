"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _testBodies = require("../test-bodies");

var _Stories2SnapsConverter = _interopRequireDefault(require("../Stories2SnapsConverter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const ignore = ['**/node_modules/**'];
const defaultStories2SnapsConverter = new _Stories2SnapsConverter.default();

function getIntegrityOptions({
  integrityOptions
}) {
  if (integrityOptions === false) {
    return false;
  }

  if (typeof integrityOptions !== 'object') {
    return false;
  }

  return _objectSpread({}, integrityOptions, {
    ignore: [...ignore, ...(integrityOptions.ignore || [])],
    absolute: true
  });
}

function ensureOptionsDefaults(options) {
  const {
    suite = 'Storyshots',
    asyncJest,
    storyNameRegex,
    storyKindRegex,
    renderer,
    serializer,
    snapshotSerializers,
    stories2snapsConverter = defaultStories2SnapsConverter,
    test: testMethod = (0, _testBodies.snapshotWithOptions)({
      renderer,
      serializer
    })
  } = options;
  const integrityOptions = getIntegrityOptions(options);
  return {
    asyncJest,
    suite,
    storyNameRegex,
    storyKindRegex,
    stories2snapsConverter,
    testMethod,
    snapshotSerializers,
    integrityOptions
  };
}

var _default = ensureOptionsDefaults;
exports.default = _default;