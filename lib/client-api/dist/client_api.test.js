"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getContext = void 0;

var _clientLogger = require("@storybook/client-logger");

var _addons = require("@storybook/addons");

var _client_api = _interopRequireDefault(require("./client_api"));

var _config_api = _interopRequireDefault(require("./config_api"));

var _story_store = _interopRequireDefault(require("./story_store"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var getContext = function () {
  return function (decorateStory) {
    var channel = (0, _addons.mockChannel)();
    var storyStore = new _story_store["default"]({
      channel: channel
    });
    var clientApi = new _client_api["default"]({
      storyStore: storyStore,
      decorateStory: decorateStory
    });
    var clearDecorators = clientApi.clearDecorators;
    var configApi = new _config_api["default"]({
      clearDecorators: clearDecorators,
      storyStore: storyStore,
      channel: channel,
      clientApi: clientApi
    });
    return {
      configApi: configApi,
      storyStore: storyStore,
      channel: channel,
      clientApi: clientApi
    };
  };
}();

exports.getContext = getContext;
jest.mock('@storybook/client-logger', function () {
  return {
    logger: {
      warn: jest.fn(),
      log: jest.fn()
    }
  };
});
describe('preview.client_api', function () {
  describe('setAddon', function () {
    it('should register addons', function () {
      var _getContext = getContext(undefined),
          clientApi = _getContext.clientApi;

      var data;
      clientApi.setAddon({
        aa: function aa() {
          data = 'foo';
        }
      });
      clientApi.storiesOf('none', module).aa();
      expect(data).toBe('foo');
    });
    it('should not remove previous addons', function () {
      var _getContext2 = getContext(undefined),
          clientApi = _getContext2.clientApi;

      var data = [];
      clientApi.setAddon({
        aa: function aa() {
          data.push('foo');
        }
      });
      clientApi.setAddon({
        bb: function bb() {
          data.push('bar');
        }
      });
      clientApi.storiesOf('none', module).aa().bb();
      expect(data).toEqual(['foo', 'bar']);
    });
    it('should call with the clientApi context', function () {
      var _getContext3 = getContext(undefined),
          clientApi = _getContext3.clientApi;

      var data;
      clientApi.setAddon({
        aa: function aa() {
          data = _typeof(this.add);
        }
      });
      clientApi.storiesOf('none', module).aa();
      expect(data).toBe('function');
    });
    it('should be able to access addons added previously', function () {
      var _getContext4 = getContext(undefined),
          clientApi = _getContext4.clientApi;

      var data;
      clientApi.setAddon({
        aa: function aa() {
          data = 'foo';
        }
      });
      clientApi.setAddon({
        bb: function bb() {
          this.aa();
        }
      });
      clientApi.storiesOf('none', module).bb();
      expect(data).toBe('foo');
    });
    it('should be able to access the current kind', function () {
      var _getContext5 = getContext(undefined),
          clientApi = _getContext5.clientApi;

      var kind = 'dfdwf3e3';
      var data;
      clientApi.setAddon({
        aa: function aa() {
          data = this.kind;
        }
      });
      clientApi.storiesOf(kind, module).aa();
      expect(data).toBe(kind);
    });
  });
  describe('addParameters', function () {
    it('should add parameters', function () {
      var _getContext6 = getContext(undefined),
          clientApi = _getContext6.clientApi;

      clientApi.addParameters({
        a: '1'
      }); // @ts-ignore

      expect(clientApi._globalParameters).toEqual({
        a: '1',
        options: {}
      });
    });
    it('should merge options', function () {
      var _getContext7 = getContext(undefined),
          clientApi = _getContext7.clientApi;

      clientApi.addParameters({
        options: {
          a: '1'
        }
      });
      clientApi.addParameters({
        options: {
          b: '2'
        }
      }); // @ts-ignore

      expect(clientApi._globalParameters).toEqual({
        options: {
          a: '1',
          b: '2'
        }
      });
    });
    it('should override specific properties in options', function () {
      var _getContext8 = getContext(undefined),
          clientApi = _getContext8.clientApi;

      clientApi.addParameters({
        backgrounds: ['value'],
        options: {
          a: '1',
          b: '3'
        }
      });
      clientApi.addParameters({
        options: {
          a: '2'
        }
      }); // @ts-ignore

      expect(clientApi._globalParameters).toEqual({
        backgrounds: ['value'],
        options: {
          a: '2',
          b: '3'
        }
      });
    });
    it('should replace top level properties and override specific properties in options', function () {
      var _getContext9 = getContext(undefined),
          clientApi = _getContext9.clientApi;

      clientApi.addParameters({
        backgrounds: ['value'],
        options: {
          a: '1',
          b: '3'
        }
      });
      clientApi.addParameters({
        backgrounds: [],
        options: {
          a: '2'
        }
      }); // @ts-ignore

      expect(clientApi._globalParameters).toEqual({
        backgrounds: [],
        options: {
          a: '2',
          b: '3'
        }
      });
    });
    it('should deep merge in options', function () {
      var _getContext10 = getContext(undefined),
          clientApi = _getContext10.clientApi;

      clientApi.addParameters({
        options: {
          a: '1',
          b: '2',
          theming: {
            c: '3'
          }
        }
      });
      clientApi.addParameters({
        options: {
          theming: {
            c: '4',
            d: '5'
          }
        }
      }); // @ts-ignore

      expect(clientApi._globalParameters).toEqual({
        options: {
          a: '1',
          b: '2',
          theming: {
            c: '4',
            d: '5'
          }
        }
      });
    });
  });
  describe('addDecorator', function () {
    it('should add local decorators', function () {
      var _getContext11 = getContext(undefined),
          storiesOf = _getContext11.clientApi.storiesOf,
          storyStore = _getContext11.storyStore;

      storiesOf('kind', module).addDecorator(function (fn) {
        return "aa-".concat(fn());
      }).add('name', function () {
        return 'Hello';
      });
      expect(storyStore.fromId('kind--name').storyFn()).toBe('aa-Hello');
    });
    it('should add global decorators', function () {
      var _getContext12 = getContext(undefined),
          _getContext12$clientA = _getContext12.clientApi,
          addDecorator = _getContext12$clientA.addDecorator,
          storiesOf = _getContext12$clientA.storiesOf,
          storyStore = _getContext12.storyStore;

      addDecorator(function (fn) {
        return "bb-".concat(fn());
      });
      storiesOf('kind', module).add('name', function () {
        return 'Hello';
      });
      var f = storyStore.fromId('x');
      expect(storyStore.fromId('kind--name').storyFn()).toBe('bb-Hello');
    });
    it('should utilize both decorators at once', function () {
      var _getContext13 = getContext(undefined),
          _getContext13$clientA = _getContext13.clientApi,
          addDecorator = _getContext13$clientA.addDecorator,
          storiesOf = _getContext13$clientA.storiesOf,
          storyStore = _getContext13.storyStore;

      addDecorator(function (fn) {
        return "aa-".concat(fn());
      });
      storiesOf('kind', module).addDecorator(function (fn) {
        return "bb-".concat(fn());
      }).add('name', function () {
        return 'Hello';
      });
      expect(storyStore.fromId('kind--name').storyFn()).toBe('aa-bb-Hello');
    });
    it('should pass the context', function () {
      var _getContext14 = getContext(undefined),
          storiesOf = _getContext14.clientApi.storiesOf,
          storyStore = _getContext14.storyStore;

      storiesOf('kind', module).addDecorator(function (fn) {
        return "aa-".concat(fn());
      }).add('name', function (c) {
        return "".concat(c.kind, "-").concat(c.name);
      });
      var result = storyStore.fromId('kind--name').storyFn();
      expect(result).toBe("aa-kind-name");
    });
    it('should have access to the context', function () {
      var _getContext15 = getContext(undefined),
          storiesOf = _getContext15.clientApi.storiesOf,
          storyStore = _getContext15.storyStore;

      storiesOf('kind', module).addDecorator(function (fn, _ref) {
        var kind = _ref.kind,
            name = _ref.name;
        return "".concat(kind, "-").concat(name, "-").concat(fn());
      }).add('name', function () {
        return 'Hello';
      });
      var result = storyStore.fromId('kind--name').storyFn();
      expect(result).toBe("kind-name-Hello");
    });
  });
  describe('clearDecorators', function () {
    it('should remove all global decorators', function () {
      var _getContext16 = getContext(undefined),
          clientApi = _getContext16.clientApi; // @ts-ignore


      clientApi._globalDecorators = 1234;
      clientApi.clearDecorators(); // @ts-ignore

      expect(clientApi._globalDecorators).toEqual([]);
    });
  });
  describe('getStorybook', function () {
    it('should transform the storybook to an array with filenames', function () {
      var _getContext17 = getContext(undefined),
          _getContext17$clientA = _getContext17.clientApi,
          getStorybook = _getContext17$clientA.getStorybook,
          storiesOf = _getContext17$clientA.storiesOf;

      var book;
      book = getStorybook();
      expect(book).toEqual([]);
      storiesOf('kind 1', module).add('name 1', function () {
        return '1';
      }).add('name 2', function () {
        return '2';
      });
      storiesOf('kind 2', module).add('name 1', function () {
        return '1';
      }).add('name 2', function () {
        return '2';
      });
      book = getStorybook();
      expect(book).toEqual([expect.objectContaining({
        fileName: expect.any(String),
        kind: 'kind 1',
        stories: [{
          name: 'name 1',
          render: expect.any(Function)
        }, {
          name: 'name 2',
          render: expect.any(Function)
        }]
      }), expect.objectContaining({
        fileName: expect.any(String),
        kind: 'kind 2',
        stories: [{
          name: 'name 1',
          render: expect.any(Function)
        }, {
          name: 'name 2',
          render: expect.any(Function)
        }]
      })]);
    });
    it('reads filename from module', function () {
      var _getContext18 = getContext(undefined),
          _getContext18$clientA = _getContext18.clientApi,
          getStorybook = _getContext18$clientA.getStorybook,
          storiesOf = _getContext18$clientA.storiesOf;

      var fn = jest.fn();
      storiesOf('kind', {
        id: 'foo.js'
      }).add('name', fn);
      var storybook = getStorybook();
      expect(storybook).toEqual([{
        kind: 'kind',
        fileName: 'foo.js',
        stories: [{
          name: 'name',
          render: expect.any(Function)
        }]
      }]);
    });
    it('should stringify ids from module', function () {
      var _getContext19 = getContext(undefined),
          _getContext19$clientA = _getContext19.clientApi,
          getStorybook = _getContext19$clientA.getStorybook,
          storiesOf = _getContext19$clientA.storiesOf;

      var fn = jest.fn();
      storiesOf('kind', {
        id: 1211
      }).add('name', fn);
      var storybook = getStorybook();
      expect(storybook).toEqual([{
        kind: 'kind',
        fileName: '1211',
        stories: [{
          name: 'name',
          render: expect.any(Function)
        }]
      }]);
    });
  });
  describe('hot module loading', function () {
    var MockModule = function MockModule() {
      _classCallCheck(this, MockModule);

      this.id = 'mock-module-id';
      this.hot = {
        callbacks: [],
        dispose: function dispose(fn) {
          this.callbacks.push(fn);
        },
        reload: function reload() {
          this.callbacks.forEach(function (fn) {
            return fn();
          });
        }
      };
    };

    it('should increment store revision when the module reloads', function () {
      var _getContext20 = getContext(undefined),
          storyStore = _getContext20.storyStore,
          storiesOf = _getContext20.clientApi.storiesOf;

      var module = new MockModule();
      expect(storyStore.getRevision()).toEqual(0);
      storiesOf('kind', module);
      module.hot.reload();
      expect(storyStore.getRevision()).toEqual(1);
    });
    it('should replace a kind when the module reloads', function () {
      var _getContext21 = getContext(undefined),
          _getContext21$clientA = _getContext21.clientApi,
          storiesOf = _getContext21$clientA.storiesOf,
          getStorybook = _getContext21$clientA.getStorybook;

      var module = new MockModule();
      var stories = [jest.fn(), jest.fn()];
      expect(getStorybook()).toEqual([]);
      storiesOf('kind', module).add('story', stories[0]);
      var firstStorybook = getStorybook();
      expect(firstStorybook).toEqual([{
        fileName: expect.any(String),
        kind: 'kind',
        stories: [{
          name: 'story',
          render: expect.anything()
        }]
      }]);
      firstStorybook[0].stories[0].render();
      expect(stories[0]).toHaveBeenCalled();
      module.hot.reload();
      expect(getStorybook()).toEqual([]);
      storiesOf('kind', module).add('story', stories[1]);
      var secondStorybook = getStorybook();
      expect(secondStorybook).toEqual([{
        fileName: expect.any(String),
        kind: 'kind',
        stories: [{
          name: 'story',
          render: expect.anything()
        }]
      }]);
      secondStorybook[0].stories[0].render();
      expect(stories[1]).toHaveBeenCalled();
      expect(_clientLogger.logger.warn).not.toHaveBeenCalled();
    });
  });
  describe('parameters', function () {
    it('collects parameters across different modalities', function () {
      var _getContext22 = getContext(undefined),
          storyStore = _getContext22.storyStore,
          _getContext22$clientA = _getContext22.clientApi,
          storiesOf = _getContext22$clientA.storiesOf,
          addParameters = _getContext22$clientA.addParameters;

      addParameters({
        a: 'global',
        b: 'global',
        c: 'global'
      });
      var kind = storiesOf('kind', module);
      kind.addParameters({
        b: 'kind',
        c: 'kind'
      });
      kind.add('name', jest.fn(), {
        c: 'story'
      });
      expect(storyStore.fromId('kind--name').parameters).toEqual({
        a: 'global',
        b: 'kind',
        c: 'story',
        fileName: expect.any(String),
        options: expect.any(Object)
      });
    });
    it('combines object parameters per-key', function () {
      var _getContext23 = getContext(undefined),
          storyStore = _getContext23.storyStore,
          _getContext23$clientA = _getContext23.clientApi,
          storiesOf = _getContext23$clientA.storiesOf,
          addParameters = _getContext23$clientA.addParameters;

      addParameters({
        addon1: 'global string value',
        addon2: ['global array value'],
        addon3: {
          global: true,
          sub: {
            global: true
          }
        },
        options: expect.any(Object)
      });
      storiesOf('kind', module).addParameters({
        addon1: 'local string value',
        addon2: ['local array value'],
        addon3: {
          local: true,
          sub: {
            local: true
          }
        }
      }).add('name', jest.fn(), {
        addon1: 'local string value',
        addon2: ['local array value'],
        addon3: {
          local: true,
          sub: {
            local: true
          }
        }
      });
      expect(storyStore.fromId('kind--name').parameters).toEqual({
        addon1: 'local string value',
        addon2: ['local array value'],
        addon3: {
          global: true,
          local: true,
          sub: {
            global: true,
            local: true
          }
        },
        fileName: expect.any(String),
        options: expect.any(Object)
      });
    });
  });
  describe('storiesOf', function () {
    describe('add', function () {
      it('should replace stories when adding the same story', function () {
        var stories = [jest.fn().mockReturnValue('story1'), jest.fn().mockReturnValue('story2')];

        var _getContext24 = getContext(undefined),
            _getContext24$clientA = _getContext24.clientApi,
            storiesOf = _getContext24$clientA.storiesOf,
            getStorybook = _getContext24$clientA.getStorybook;

        expect(getStorybook()).toEqual([]);
        storiesOf('kind', module).add('story', stories[0]);
        {
          var book = getStorybook();
          expect(book).toHaveLength(1);
          var entry = book[0];
          expect(entry.kind).toMatch('kind');
          expect(entry.stories).toHaveLength(1);
          expect(entry.stories[0].name).toBe('story'); // v3 returns the same function we passed in

          if (jest.isMockFunction(entry.stories[0].render)) {
            expect(entry.stories[0].render).toBe(stories[0]);
          } else {
            expect(entry.stories[0].render()).toBe('story1');
          }
        }
        storiesOf('kind', module).add('story', stories[1]); // @ts-ignore

        expect(_clientLogger.logger.warn.mock.calls[0][0]).toMatch(/Story with id kind--story already exists in the store/);
        {
          var _book = getStorybook();

          expect(_book).toHaveLength(1);
          var _entry = _book[0];
          expect(_entry.kind).toMatch('kind');
          expect(_entry.stories).toHaveLength(1);
          expect(_entry.stories[0].name).toBe('story'); // v3 returns the same function we passed in

          if (jest.isMockFunction(_entry.stories[0].render)) {
            expect(_entry.stories[0].render).toBe(stories[0]);
          } else {
            expect(_entry.stories[0].render()).toBe('story2');
          }
        }
      });
    });
  });
});