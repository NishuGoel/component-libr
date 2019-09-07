"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _channelPostmessage = _interopRequireDefault(require("@storybook/channel-postmessage"));

var _utils = require("@storybook/router/utils");

var _story_store = _interopRequireDefault(require("./story_store"));

var _client_api = require("./client_api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

jest.mock('@storybook/node-logger', function () {
  return {
    logger: {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    }
  };
});
var channel = (0, _channelPostmessage["default"])({
  page: 'preview'
});

var make = function make(kind, name, storyFn) {
  var parameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  return [{
    kind: kind,
    name: name,
    storyFn: storyFn,
    parameters: parameters,
    id: (0, _utils.toId)(kind, name)
  }, {
    applyDecorators: _client_api.defaultDecorateStory,
    getDecorators: function getDecorators() {
      return [];
    }
  }];
};

describe('preview.story_store', function () {
  describe('raw storage', function () {
    it('stores hash object', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.addStory.apply(store, _toConsumableArray(make('a', '1', function () {
        return 0;
      })).concat([undefined]));
      store.addStory.apply(store, _toConsumableArray(make('a', '2', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('b', '1', function () {
        return 0;
      })));
      var extracted = store.extract(); // We need exact key ordering, even if in theory JS doesns't guarantee it

      expect(Object.keys(extracted)).toEqual(['a--1', 'a--2', 'b--1']); // content of item should be correct

      expect(extracted['a--1']).toMatchObject({
        id: 'a--1',
        kind: 'a',
        name: '1',
        parameters: expect.any(Object)
      });
    });
  });
  describe('dumpStoryBook', function () {
    it('should return nothing when empty', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      expect(store.dumpStoryBook()).toEqual([]);
    });
    it('should return storybook with stories', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.1', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.2', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'story-2.1', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'story-2.2', function () {
        return 0;
      })));
      expect(store.dumpStoryBook()).toEqual([{
        kind: 'kind-1',
        stories: ['story-1.1', 'story-1.2']
      }, {
        kind: 'kind-2',
        stories: ['story-2.1', 'story-2.2']
      }]);
    });
  });
  describe('getStoryFileName', function () {
    it('should return the filename of the first story passed for the kind', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.1', function () {
        return 0;
      }, {
        fileName: 'foo.js'
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.2', function () {
        return 0;
      }, {
        fileName: 'foo-2.js'
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'story-2.1', function () {
        return 0;
      }, {
        fileName: 'bar.js'
      })));
      expect(store.getStoryFileName('kind-1')).toBe('foo.js');
      expect(store.getStoryFileName('kind-2')).toBe('bar.js');
    });
  });
  describe('removeStoryKind', function () {
    it('should not error even if there is no kind', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.removeStoryKind('kind');
    });
    it('should remove the kind in both modern and legacy APIs', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.1', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.2', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'story-2.1', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'story-2.2', function () {
        return 0;
      })));
      store.removeStoryKind('kind-1'); // _legacydata

      expect(store.hasStory('kind-1', 'story-1.1')).toBeFalsy();
      expect(store.hasStory('kind-2', 'story-2.1')).toBeTruthy(); // _data

      expect(store.fromId((0, _utils.toId)('kind-1', 'story-1.1'))).toBeFalsy();
      expect(store.fromId((0, _utils.toId)('kind-2', 'story-2.1'))).toBeTruthy();
    });
  });
  describe('remove', function () {
    it('should remove the kind in both modern and legacy APIs', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.1', function () {
        return 0;
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.2', function () {
        return 0;
      })));
      store.remove((0, _utils.toId)('kind-1', 'story-1.1')); // _legacydata

      expect(store.hasStory('kind-1', 'story-1.1')).toBeFalsy();
      expect(store.hasStory('kind-1', 'story-1.2')).toBeTruthy(); // _data

      expect(store.fromId((0, _utils.toId)('kind-1', 'story-1.1'))).toBeFalsy();
      expect(store.fromId((0, _utils.toId)('kind-1', 'story-1.2'))).toBeTruthy();
    });
  });
  describe('getStoryAndParameters', function () {
    it('should return parameters that we passed in', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      var story = jest.fn();
      var parameters = {
        fileName: 'foo.js',
        parameter: 'value'
      };
      store.addStory.apply(store, _toConsumableArray(make('kind', 'name', story, parameters)));
      expect(store.getStoryAndParameters('kind', 'name').parameters).toEqual(parameters);
    });
  });
  describe('getStoryWithContext', function () {
    it('should return a function that calls the story with the context', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      var storyFn = jest.fn();
      var parameters = {
        fileName: 'foo.js',
        parameter: 'value'
      };
      store.addStory.apply(store, _toConsumableArray(make('kind', 'name', storyFn, parameters)));
      var storyWithContext = store.getStoryWithContext('kind', 'name');
      storyWithContext();
      expect(storyFn).toHaveBeenCalledWith({
        id: 'kind--name',
        name: 'name',
        kind: 'kind',
        story: 'name',
        parameters: parameters
      });
    });
  });
  describe('story sorting', function () {
    var storySort = function storySort(a, b) {
      return a[1].id.localeCompare(b[1].id);
    };

    it('should use the sorting function of the story parameter object', function () {
      var store = new _story_store["default"]({
        channel: channel
      });
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'a-story-2.1', function () {
        return 0;
      }, {
        fileName: 'bar.js',
        options: {
          storySort: storySort
        }
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'z-story-1.1', function () {
        return 0;
      }, {
        fileName: 'foo.js',
        options: {
          storySort: storySort
        }
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-1', 'story-1.2', function () {
        return 0;
      }, {
        fileName: 'foo-2.js',
        options: {
          storySort: storySort
        }
      })));
      store.addStory.apply(store, _toConsumableArray(make('kind-2', 'story-2.1', function () {
        return 0;
      }, {
        fileName: 'bar.js',
        options: {
          storySort: storySort
        }
      })));
      var stories = Object.values(store.extract());
      expect(stories[0].id).toBe('kind-1--story-1-2');
      expect(stories[1].id).toBe('kind-1--z-story-1-1');
      expect(stories[2].id).toBe('kind-2--a-story-2-1');
      expect(stories[3].id).toBe('kind-2--story-2-1');
    });
  });
});