"use strict";

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.keys");

var _stories = _interopRequireDefault(require("../modules/stories"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function createMockStore() {
  var state = {};
  return {
    getState: jest.fn().mockImplementation(function () {
      return state;
    }),
    setState: jest.fn().mockImplementation(function (s) {
      state = Object.assign({}, state, {}, s);
    })
  };
}

describe('stories API', function () {
  it('sets a sensible initialState', function () {
    var _initStories = (0, _stories["default"])({
      storyId: 'id',
      viewMode: 'story'
    }),
        state = _initStories.state;

    expect(state).toEqual({
      storiesConfigured: false,
      storiesHash: {},
      storyId: 'id',
      viewMode: 'story'
    });
  });
  var parameters = {
    options: {
      hierarchyRootSeparator: '|',
      hierarchySeparator: '/'
    }
  };
  var storiesHash = {
    'a--1': {
      kind: 'a',
      name: '1',
      parameters: parameters,
      path: 'a--1',
      id: 'a--1'
    },
    'a--2': {
      kind: 'a',
      name: '2',
      parameters: parameters,
      path: 'a--2',
      id: 'a--2'
    },
    'b-c--1': {
      kind: 'b/c',
      name: '1',
      parameters: parameters,
      path: 'b-c--1',
      id: 'b-c--1'
    }
  };
  describe('setStories', function () {
    it('stores basic kinds and stories w/ correct keys', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories2 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories2.api.setStories;

      setStories(storiesHash);

      var _store$getState = store.getState(),
          storedStoriesHash = _store$getState.storiesHash; // We need exact key ordering, even if in theory JS doens't guarantee it


      expect(Object.keys(storedStoriesHash)).toEqual(['a', 'a--1', 'a--2', 'b', 'b-c', 'b-c--1']);
      expect(storedStoriesHash.a).toMatchObject({
        id: 'a',
        children: ['a--1', 'a--2'],
        isRoot: false,
        isComponent: true
      });
      expect(storedStoriesHash['a--1']).toMatchObject({
        id: 'a--1',
        parent: 'a',
        kind: 'a',
        name: '1',
        parameters: parameters
      });
      expect(storedStoriesHash['a--2']).toMatchObject({
        id: 'a--2',
        parent: 'a',
        kind: 'a',
        name: '2',
        parameters: parameters
      });
      expect(storedStoriesHash.b).toMatchObject({
        id: 'b',
        children: ['b-c'],
        isRoot: false,
        isComponent: false
      });
      expect(storedStoriesHash['b-c']).toMatchObject({
        id: 'b-c',
        parent: 'b',
        children: ['b-c--1'],
        isRoot: false,
        isComponent: true
      });
      expect(storedStoriesHash['b-c--1']).toMatchObject({
        id: 'b-c--1',
        parent: 'b-c',
        kind: 'b/c',
        name: '1',
        parameters: parameters
      });
    });
    it('handles roots also', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories3 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories3.api.setStories;

      setStories({
        'a--1': {
          kind: 'a',
          name: '1',
          parameters: parameters,
          path: 'a--1',
          id: 'a--1'
        },
        'a--2': {
          kind: 'a',
          name: '2',
          parameters: parameters,
          path: 'a--2',
          id: 'a--2'
        },
        'b-c--1': {
          kind: 'b|c',
          name: '1',
          parameters: parameters,
          path: 'b-c--1',
          id: 'b-c--1'
        }
      });

      var _store$getState2 = store.getState(),
          storedStoriesHash = _store$getState2.storiesHash; // We need exact key ordering, even if in theory JS doens't guarantee it


      expect(Object.keys(storedStoriesHash)).toEqual(['a', 'a--1', 'a--2', 'b', 'b-c', 'b-c--1']);
      expect(storedStoriesHash.b).toMatchObject({
        id: 'b',
        children: ['b-c'],
        isRoot: true,
        isComponent: false
      });
      expect(storedStoriesHash['b-c']).toMatchObject({
        id: 'b-c',
        parent: 'b',
        children: ['b-c--1'],
        isRoot: false,
        isComponent: true
      });
      expect(storedStoriesHash['b-c--1']).toMatchObject({
        id: 'b-c--1',
        parent: 'b-c',
        kind: 'b|c',
        name: '1',
        parameters: parameters
      });
    }); // Stories can get out of order for a few reasons -- see reproductions on
    //   https://github.com/storybookjs/storybook/issues/5518

    it('does the right thing for out of order stories', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories4 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories4.api.setStories;

      setStories({
        'a--1': {
          kind: 'a',
          name: '1',
          parameters: parameters,
          path: 'a--1',
          id: 'a--1'
        },
        'b--1': {
          kind: 'b',
          name: '1',
          parameters: parameters,
          path: 'b--1',
          id: 'b--1'
        },
        'a--2': {
          kind: 'a',
          name: '2',
          parameters: parameters,
          path: 'a--2',
          id: 'a--2'
        }
      });

      var _store$getState3 = store.getState(),
          storedStoriesHash = _store$getState3.storiesHash; // We need exact key ordering, even if in theory JS doens't guarantee it


      expect(Object.keys(storedStoriesHash)).toEqual(['a', 'a--1', 'a--2', 'b', 'b--1']);
      expect(storedStoriesHash.a).toMatchObject({
        id: 'a',
        children: ['a--1', 'a--2'],
        isRoot: false,
        isComponent: true
      });
      expect(storedStoriesHash.b).toMatchObject({
        id: 'b',
        children: ['b--1'],
        isRoot: false,
        isComponent: true
      });
    });
    it('navigates to the first story in the store if there is none selected', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'story'
          };
        },
        setState: jest.fn()
      };

      var _initStories5 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories5.api.setStories;

      setStories(storiesHash);
      expect(navigate).toHaveBeenCalledWith('/story/a--1');
    });
    it('navigates to the first story in the store if a non-existent story was selected', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'story',
            storyId: 'random'
          };
        },
        setState: jest.fn()
      };

      var _initStories6 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories6.api.setStories;

      setStories(storiesHash);
      expect(navigate).toHaveBeenCalledWith('/story/a--1');
    });
    it('does not navigate if a existing story was selected', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'story',
            storyId: 'b-c--1'
          };
        },
        setState: jest.fn()
      };

      var _initStories7 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories7.api.setStories;

      setStories(storiesHash);
      expect(navigate).not.toHaveBeenCalled();
    });
    it('navigates to the settings page if a existing page was selected', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'settings',
            storyId: 'about'
          };
        },
        setState: jest.fn()
      };

      var _initStories8 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories8.api.setStories;

      setStories(storiesHash);
      expect(navigate).toHaveBeenCalledWith('/settings/about');
    });
    it('navigates to the first story in the store when viewMode is settings but' + 'non-existent page was selected', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'settings',
            storyId: 'random'
          };
        },
        setState: jest.fn()
      };

      var _initStories9 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          setStories = _initStories9.api.setStories;

      setStories(storiesHash);
      expect(navigate).toHaveBeenCalledWith('/story/a--1');
    });
  });
  describe('jumpToStory', function () {
    it('works forward', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories10 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'a--1',
        viewMode: 'story'
      }),
          _initStories10$api = _initStories10.api,
          setStories = _initStories10$api.setStories,
          jumpToStory = _initStories10$api.jumpToStory,
          state = _initStories10.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToStory(1);
      expect(navigate).toHaveBeenCalledWith('/story/a--2');
    });
    it('works backwards', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories11 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'a--2',
        viewMode: 'story'
      }),
          _initStories11$api = _initStories11.api,
          setStories = _initStories11$api.setStories,
          jumpToStory = _initStories11$api.jumpToStory,
          state = _initStories11.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToStory(-1);
      expect(navigate).toHaveBeenCalledWith('/story/a--1');
    });
    it('does nothing if you are at the last story and go forward', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories12 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'b-c--1',
        viewMode: 'story'
      }),
          _initStories12$api = _initStories12.api,
          setStories = _initStories12$api.setStories,
          jumpToStory = _initStories12$api.jumpToStory,
          state = _initStories12.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToStory(1);
      expect(navigate).not.toHaveBeenCalled();
    });
    it('does nothing if you are at the first story and go backward', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories13 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'a--1',
        viewMode: 'story'
      }),
          _initStories13$api = _initStories13.api,
          setStories = _initStories13$api.setStories,
          jumpToStory = _initStories13$api.jumpToStory,
          state = _initStories13.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToStory(-1);
      expect(navigate).not.toHaveBeenCalled();
    });
    it('does nothing if you have not selected a story', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            storiesHash: storiesHash
          };
        }
      };

      var _initStories14 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          jumpToStory = _initStories14.api.jumpToStory;

      jumpToStory(1);
      expect(navigate).not.toHaveBeenCalled();
    });
  });
  describe('jumpToComponent', function () {
    it('works forward', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories15 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'a--1',
        viewMode: 'story'
      }),
          _initStories15$api = _initStories15.api,
          setStories = _initStories15$api.setStories,
          jumpToComponent = _initStories15$api.jumpToComponent,
          state = _initStories15.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToComponent(1);
      expect(navigate).toHaveBeenCalledWith('/story/b-c--1');
    });
    it('works backwards', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories16 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'b-c--1',
        viewMode: 'story'
      }),
          _initStories16$api = _initStories16.api,
          setStories = _initStories16$api.setStories,
          jumpToComponent = _initStories16$api.jumpToComponent,
          state = _initStories16.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToComponent(-1);
      expect(navigate).toHaveBeenCalledWith('/story/a--1');
    });
    it('does nothing if you are in the last component and go forward', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories17 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'b-c--1',
        viewMode: 'story'
      }),
          _initStories17$api = _initStories17.api,
          setStories = _initStories17$api.setStories,
          jumpToComponent = _initStories17$api.jumpToComponent,
          state = _initStories17.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToComponent(1);
      expect(navigate).not.toHaveBeenCalled();
    });
    it('does nothing if you are at the first component and go backward', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories18 = (0, _stories["default"])({
        store: store,
        navigate: navigate,
        storyId: 'a--2',
        viewMode: 'story'
      }),
          _initStories18$api = _initStories18.api,
          setStories = _initStories18$api.setStories,
          jumpToComponent = _initStories18$api.jumpToComponent,
          state = _initStories18.state;

      store.setState(state);
      setStories(storiesHash);
      jumpToComponent(-1);
      expect(navigate).not.toHaveBeenCalled();
    });
  });
  describe('selectStory', function () {
    it('navigates', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'story',
            storiesHash: storiesHash
          };
        }
      };

      var _initStories19 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          selectStory = _initStories19.api.selectStory;

      selectStory('a--2');
      expect(navigate).toHaveBeenCalledWith('/story/a--2');
    });
    it('allows navigating to kind/storyname (legacy api)', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'story',
            storiesHash: storiesHash
          };
        }
      };

      var _initStories20 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          selectStory = _initStories20.api.selectStory;

      selectStory('a', '2');
      expect(navigate).toHaveBeenCalledWith('/story/a--2');
    });
    it('allows navigating to storyname, without kind (legacy api)', function () {
      var navigate = jest.fn();
      var store = {
        getState: function getState() {
          return {
            viewMode: 'story',
            storyId: 'a--1',
            storiesHash: storiesHash
          };
        }
      };

      var _initStories21 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          selectStory = _initStories21.api.selectStory;

      selectStory(null, '2');
      expect(navigate).toHaveBeenCalledWith('/story/a--2');
    });
    it('allows navigating to first story in kind on call by kind', function () {
      var navigate = jest.fn();
      var store = createMockStore();

      var _initStories22 = (0, _stories["default"])({
        store: store,
        navigate: navigate
      }),
          _initStories22$api = _initStories22.api,
          selectStory = _initStories22$api.selectStory,
          setStories = _initStories22$api.setStories,
          state = _initStories22.state;

      store.setState(state);
      setStories(storiesHash);
      selectStory('a');
      expect(navigate).toHaveBeenCalledWith('/story/a--1');
    });
  });
});