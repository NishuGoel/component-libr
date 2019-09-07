"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _utils = require("../utils");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

describe('toId', function () {
  [// name, kind, story, output
  ['handles simple cases', 'kind', 'story', 'kind--story'], ['handles basic substitution', 'a b$c?d😀e', '1-2:3', 'a-b-c-d😀e--1-2-3'], ['handles runs of non-url chars', 'a?&*b', 'story', 'a-b--story'], ['removes non-url chars from start and end', '?ab-', 'story', 'ab--story'], ['downcases', 'KIND', 'STORY', 'kind--story'], ['non-latin', 'Кнопки', 'нормальный', 'кнопки--нормальный'], ['korean', 'kind', '바보 (babo)', 'kind--바보-babo'], ['all punctuation', 'kind', 'unicorns,’–—―′¿`"<>()!.!!!{}[]%^&$*#&', 'kind--unicorns']].forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 4),
        name = _ref2[0],
        kind = _ref2[1],
        story = _ref2[2],
        output = _ref2[3];

    it(name, function () {
      expect((0, _utils.toId)(kind, story)).toBe(output);
    });
  });
  it('does not allow kind with *no* url chars', function () {
    expect(function () {
      return (0, _utils.toId)('?', 'asdf');
    }).toThrow("Invalid kind '?', must include alphanumeric characters");
  });
  it('does not allow empty kind', function () {
    expect(function () {
      return (0, _utils.toId)('', 'asdf');
    }).toThrow("Invalid kind '', must include alphanumeric characters");
  });
  it('does not allow story with *no* url chars', function () {
    expect(function () {
      return (0, _utils.toId)('kind', '?');
    }).toThrow("Invalid name '?', must include alphanumeric characters");
  });
  it('does not allow empty story', function () {
    expect(function () {
      return (0, _utils.toId)('kind', '');
    }).toThrow("Invalid name '', must include alphanumeric characters");
  });
});