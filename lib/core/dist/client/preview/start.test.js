"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _global = require("global");

var _coreEvents = _interopRequireDefault(require("@storybook/core-events"));

var _start8 = _interopRequireWildcard(require("./start"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-underscore-dangle */
jest.mock('@storybook/client-logger');
jest.mock('global', function () {
  return {
    history: {
      replaceState: jest.fn()
    },
    navigator: {
      userAgent: 'browser',
      platform: ''
    },
    window: {
      __STORYBOOK_CLIENT_API__: undefined,
      addEventListener: jest.fn(),
      location: {
        search: ''
      },
      history: {
        replaceState: jest.fn()
      }
    },
    document: {
      addEventListener: jest.fn(),
      getElementById: jest.fn().mockReturnValue({}),
      body: {
        classList: {
          add: jest.fn(),
          remove: jest.fn()
        }
      },
      documentElement: {},
      location: {
        search: '?id=kind--story'
      }
    }
  };
});
afterEach(function () {
  _global.window.__STORYBOOK_CLIENT_API__ = undefined;
});
it('returns apis', function () {
  var render = jest.fn();
  var result = (0, _start8["default"])(render);
  expect(result).toEqual(expect.objectContaining({
    context: expect.any(Object),
    clientApi: expect.any(Object),
    configApi: expect.any(Object),
    forceReRender: expect.any(Function)
  }));
});
it('reuses the current client api when the lib is reloaded', function () {
  jest.useFakeTimers();
  var render = jest.fn();

  var _start = (0, _start8["default"])(render),
      clientApi = _start.clientApi;

  var valueOfClientApi = _global.window.__STORYBOOK_CLIENT_API__;

  var _start2 = (0, _start8["default"])(render),
      newClientApi = _start2.clientApi;

  jest.runAllTimers();
  expect(clientApi).toEqual(newClientApi);
  expect(clientApi).toEqual(valueOfClientApi);
});
it('calls render when you add a story', function () {
  jest.useFakeTimers();
  var render = jest.fn();

  var _start3 = (0, _start8["default"])(render),
      clientApi = _start3.clientApi,
      configApi = _start3.configApi;

  configApi.configure(function () {
    clientApi.storiesOf('kind', {}).add('story', function () {});
  }, {});
  jest.runAllTimers();
  expect(render).toHaveBeenCalledWith(expect.objectContaining({
    selectedKind: 'kind',
    selectedStory: 'story'
  }));
});
it('emits an exception and shows error when your story throws', function () {
  jest.useFakeTimers();
  var render = jest.fn();

  var _start4 = (0, _start8["default"])(render),
      clientApi = _start4.clientApi,
      configApi = _start4.configApi;

  configApi.configure(function () {
    clientApi.storiesOf('kind', {}).add('story1', function () {});
  }, {});
  jest.runAllTimers();
  expect(render).not.toHaveBeenCalled();
  expect(_global.document.body.classList.add).toHaveBeenCalledWith('sb-show-nopreview');
});
it('emits an error and shows error when your framework calls showError', function () {
  jest.useFakeTimers();
  var error = {
    title: 'Some error',
    description: 'description'
  };
  var render = jest.fn().mockImplementation(function (_ref) {
    var showError = _ref.showError;
    showError(error);
  });

  var _start5 = (0, _start8["default"])(render),
      clientApi = _start5.clientApi,
      configApi = _start5.configApi;

  configApi.configure(function () {
    clientApi.storiesOf('kind', {}).add('story', function () {});
  }, {});
  jest.runAllTimers();
  expect(render).toHaveBeenCalled();
  expect(_global.document.body.classList.add).toHaveBeenCalledWith('sb-show-errordisplay');
});
describe('STORY_INIT', function () {
  it('supports path params', function () {
    _global.document.location = {
      pathname: 'pathname',
      search: '?path=/story/kind--story&bar=baz'
    };
    var render = jest.fn();

    var _start6 = (0, _start8["default"])(render),
        clientApi = _start6.clientApi;

    var store = clientApi._storyStore;
    store.setSelection = jest.fn();
    store.emit(_coreEvents["default"].STORY_INIT);
    store.emit();
    expect(store.setSelection).toHaveBeenCalledWith({
      storyId: 'kind--story'
    });
  });
  it('supports story kind/name params', function () {
    _global.document.location = {
      pathname: 'pathname',
      search: '?selectedKind=kind&selectedStory=story&bar=baz'
    };
    var render = jest.fn();

    var _start7 = (0, _start8["default"])(render),
        clientApi = _start7.clientApi;

    var store = clientApi._storyStore;
    store.setSelection = jest.fn();
    store.emit(_coreEvents["default"].STORY_INIT);
    expect(_global.history.replaceState).toHaveBeenCalledWith({}, '', 'pathname?bar=baz&id=kind--story');
    expect(store.setSelection).toHaveBeenCalledWith({
      storyId: 'kind--story'
    });
  });
});
describe('story filters for module exports', function () {
  it('should include all stories when there are no filters', function () {
    expect((0, _start8.isExportStory)('a', {})).toBeTruthy();
  });
  it('should filter stories by arrays', function () {
    expect((0, _start8.isExportStory)('a', {
      includeStories: ['a']
    })).toBeTruthy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: []
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: ['b']
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      excludeStories: ['a']
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      excludeStories: []
    })).toBeTruthy();
    expect((0, _start8.isExportStory)('a', {
      excludeStories: ['b']
    })).toBeTruthy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: ['a'],
      excludeStories: ['a']
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: [],
      excludeStories: []
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: ['a'],
      excludeStories: ['b']
    })).toBeTruthy();
  });
  it('should filter stories by regex', function () {
    expect((0, _start8.isExportStory)('a', {
      includeStories: /a/
    })).toBeTruthy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: /.*/
    })).toBeTruthy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: /b/
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      excludeStories: /a/
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      excludeStories: /.*/
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      excludeStories: /b/
    })).toBeTruthy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: /a/,
      excludeStories: ['a']
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: /.*/,
      excludeStories: /.*/
    })).toBeFalsy();
    expect((0, _start8.isExportStory)('a', {
      includeStories: /a/,
      excludeStories: /b/
    })).toBeTruthy();
  });
});