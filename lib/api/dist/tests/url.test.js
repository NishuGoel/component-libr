"use strict";

require("core-js/modules/es.object.assign");

var _qs = _interopRequireDefault(require("qs"));

var _url = _interopRequireDefault(require("../modules/url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.useFakeTimers();
describe('initial state', function () {
  var viewMode = 'story';
  it('redirects to /story/* if path is blank', function () {
    var navigate = jest.fn();
    var location = {
      search: null
    };

    var _initURL = (0, _url["default"])({
      navigate: navigate,
      state: {
        location: location,
        viewMode: viewMode
      }
    }),
        layout = _initURL.state.layout; // Nothing unexpected in layout


    expect(layout).toEqual({});
    jest.runAllTimers();
    expect(navigate).toHaveBeenCalledWith('/story/*', {
      replace: true
    });
  });
  describe('config query parameters', function () {
    it('handles full parameter', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify({
          full: '1'
        })
      };

      var _initURL2 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL2.state.layout;

      expect(layout).toEqual({
        isFullscreen: true
      });
    });
    it('handles nav parameter', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify({
          nav: '0'
        })
      };

      var _initURL3 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL3.state.layout;

      expect(layout).toEqual({
        showNav: false
      });
    });
    it('handles panel parameter, bottom', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify({
          panel: 'bottom'
        })
      };

      var _initURL4 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL4.state.layout;

      expect(layout).toEqual({
        panelPosition: 'bottom'
      });
    });
    it('handles panel parameter, right', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify({
          panel: 'right'
        })
      };

      var _initURL5 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL5.state.layout;

      expect(layout).toEqual({
        panelPosition: 'right'
      });
    });
    it('handles panel parameter, 0', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify({
          panel: '0'
        })
      };

      var _initURL6 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL6.state.layout;

      expect(layout).toEqual({
        showPanel: false
      });
    });
  });
  describe('legacy query parameters', function () {
    var defaultLegacyParameters = {
      selectedKind: 'kind',
      selectedStory: 'story',
      full: '0',
      addons: '1',
      stories: '1',
      panelRight: '0',
      addonPanel: 'storybook%2Factions%2Factions-panel'
    };
    it('handles defaults and routes to story', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify(defaultLegacyParameters)
      };

      var _initURL7 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location,
          viewMode: viewMode
        }
      }),
          _initURL7$state = _initURL7.state,
          layout = _initURL7$state.layout,
          selectedPanel = _initURL7$state.selectedPanel; // Nothing unexpected in layout


      expect(layout).toEqual({}); // TODO: at the very least this should be unescaped

      expect(selectedPanel).toEqual('storybook%2Factions%2Factions-panel');
      jest.runAllTimers();
      expect(navigate).toHaveBeenCalledWith('/story/kind--story', {
        replace: true
      });
    });
    it('handles full parameter', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify(Object.assign({}, defaultLegacyParameters, {
          full: '1'
        }))
      };

      var _initURL8 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL8.state.layout;

      expect(layout).toEqual({
        isFullscreen: true
      });
    });
    it('handles addons and stories parameters', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify(Object.assign({}, defaultLegacyParameters, {
          addons: '0',
          stories: '0'
        }))
      };

      var _initURL9 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL9.state.layout;

      expect(layout).toEqual({
        showNav: false,
        showPanel: false
      });
    });
    it('handles panelRight parameter', function () {
      var navigate = jest.fn();
      var location = {
        search: _qs["default"].stringify(Object.assign({}, defaultLegacyParameters, {
          panelRight: '1'
        }))
      };

      var _initURL10 = (0, _url["default"])({
        navigate: navigate,
        state: {
          location: location
        }
      }),
          layout = _initURL10.state.layout;

      expect(layout).toEqual({
        panelPosition: 'right'
      });
    });
  });
});
describe('queryParams', function () {
  it('lets your read out parameters you set previously', function () {
    var state = {};
    var store = {
      setState: function setState(change) {
        state = Object.assign({}, state, {}, change);
      },
      getState: function getState() {
        return state;
      }
    };

    var _initURL11 = (0, _url["default"])({
      state: {
        location: {
          search: ''
        }
      },
      navigate: jest.fn(),
      store: store
    }),
        api = _initURL11.api;

    api.setQueryParams({
      foo: 'bar'
    });
    expect(api.getQueryParam('foo')).toEqual('bar');
  });
});