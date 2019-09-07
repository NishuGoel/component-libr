"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultOptions = {
  snapshotsDirName: '__snapshots__',
  snapshotExtension: '.storyshot',
  storiesExtensions: ['.js', '.jsx', '.ts', '.tsx']
};

class DefaultStories2SnapsConverter {
  constructor(options = {}) {
    this.getSnapshotExtension = () => this.options.snapshotExtension;

    this.options = _objectSpread({}, defaultOptions, {}, options);
  }

  getStoryshotFile(fileName) {
    const {
      dir,
      name
    } = _path.default.parse(fileName);

    const {
      snapshotsDirName,
      snapshotExtension
    } = this.options;
    return _path.default.format({
      dir: _path.default.join(dir, snapshotsDirName),
      name,
      ext: snapshotExtension
    });
  }

  getSnapshotFileName(context) {
    const {
      fileName
    } = context;

    if (!fileName) {
      return null;
    }

    return this.getStoryshotFile(fileName);
  }

  getPossibleStoriesFiles(storyshotFile) {
    const {
      dir,
      name
    } = _path.default.parse(storyshotFile);

    const {
      storiesExtensions
    } = this.options;
    return storiesExtensions.map(ext => _path.default.format({
      dir: _path.default.dirname(dir),
      name,
      ext
    }));
  }

}

var _default = DefaultStories2SnapsConverter;
exports.default = _default;