"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseKind = exports.getMatch = exports.stringifyQuery = exports.queryFromLocation = exports.queryFromString = exports.parsePath = exports.toId = exports.sanitize = void 0;

var _qs = _interopRequireDefault(require("qs"));

var _memoizerific = _interopRequireDefault(require("memoizerific"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var splitPathRegex = /\/([^/]+)\/([^/]+)?/; // Remove punctuation https://gist.github.com/davidjrice/9d2af51100e41c6c4b4a

var sanitize = function sanitize(string) {
  return string.toLowerCase() // eslint-disable-next-line no-useless-escape
  .replace(/[ ’–—―′¿'`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '-').replace(/-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
};

exports.sanitize = sanitize;

var sanitizeSafe = function sanitizeSafe(string, part) {
  var sanitized = sanitize(string);

  if (sanitized === '') {
    throw new Error("Invalid ".concat(part, " '").concat(string, "', must include alphanumeric characters"));
  }

  return sanitized;
};

var toId = function toId(kind, name) {
  return "".concat(sanitizeSafe(kind, 'kind'), "--").concat(sanitizeSafe(name, 'name'));
};

exports.toId = toId;
var parsePath = (0, _memoizerific["default"])(1000)(function (path) {
  var result = {
    viewMode: undefined,
    storyId: undefined
  };

  if (path) {
    var _ref = path.match(splitPathRegex) || [undefined, undefined, undefined],
        _ref2 = _slicedToArray(_ref, 3),
        viewMode = _ref2[1],
        storyId = _ref2[2];

    if (viewMode) {
      Object.assign(result, {
        viewMode: viewMode,
        storyId: storyId
      });
    }
  }

  return result;
});
exports.parsePath = parsePath;
var queryFromString = (0, _memoizerific["default"])(1000)(function (s) {
  return _qs["default"].parse(s, {
    ignoreQueryPrefix: true
  });
});
exports.queryFromString = queryFromString;

var queryFromLocation = function queryFromLocation(location) {
  return queryFromString(location.search);
};

exports.queryFromLocation = queryFromLocation;

var stringifyQuery = function stringifyQuery(query) {
  return _qs["default"].stringify(query, {
    addQueryPrefix: true,
    encode: false
  });
};

exports.stringifyQuery = stringifyQuery;
var getMatch = (0, _memoizerific["default"])(1000)(function (current, target) {
  var startsWith = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var startsWithTarget = current && startsWith && current.startsWith(target);
  var currentIsTarget = typeof target === 'string' && current === target;
  var matchTarget = current && target && current.match(target);

  if (startsWithTarget || currentIsTarget || matchTarget) {
    return {
      path: current
    };
  }

  return null;
});
exports.getMatch = getMatch;

var parseKind = function parseKind(kind, _ref3) {
  var rootSeparator = _ref3.rootSeparator,
      groupSeparator = _ref3.groupSeparator;

  var _kind$split = kind.split(rootSeparator, 2),
      _kind$split2 = _slicedToArray(_kind$split, 2),
      root = _kind$split2[0],
      remainder = _kind$split2[1];

  var groups = (remainder || kind).split(groupSeparator).filter(function (i) {
    return !!i;
  }); // when there's no remainder, it means the root wasn't found/split

  return {
    root: remainder ? root : null,
    groups: groups
  };
};

exports.parseKind = parseKind;