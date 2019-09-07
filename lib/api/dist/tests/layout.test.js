"use strict";

var _theming = require("@storybook/theming");

var _layout = _interopRequireDefault(require("../modules/layout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('layout API', function () {
  describe('setOptions', function () {
    var layoutApi;
    var store;
    var currentState;

    var getLastSetStateArgs = function getLastSetStateArgs() {
      var calls = store.setState.mock.calls;
      return calls[calls.length - 1];
    };

    beforeEach(function () {
      currentState = {
        ui: {
          enableShortcuts: true,
          sidebarAnimations: true,
          docsMode: false
        },
        layout: {
          isToolshown: true,
          isFullscreen: false,
          showPanel: true,
          showNav: true,
          panelPosition: 'bottom'
        },
        selectedPanel: 'storybook/actions/panel',
        theme: _theming.themes.light
      };
      store = {
        getState: function getState() {
          return currentState;
        },
        setState: jest.fn()
      };
      layoutApi = (0, _layout["default"])({
        store: store
      }).api;
    });
    it('should not change selectedPanel if it is undefined in the options', function () {
      layoutApi.setOptions({});
      expect(getLastSetStateArgs()).toBeUndefined();
    });
    it('should not change selectedPanel if it is undefined in the options, but something else has changed', function () {
      layoutApi.setOptions({
        panelPosition: 'right'
      });
      expect(getLastSetStateArgs()[0].selectedPanel).toBeUndefined();
    });
    it('should not change selectedPanel if it is currently the same', function () {
      var panelName = currentState.selectedPanel;
      layoutApi.setOptions({}); // second call is needed to overwrite initial layout

      layoutApi.setOptions({
        selectedPanel: panelName
      });
      expect(getLastSetStateArgs()).toBeUndefined();
    });
    it('should not change selectedPanel if it is currently the same, but something else has changed', function () {
      layoutApi.setOptions({}); // second call is needed to overwrite initial layout

      layoutApi.setOptions({
        panelPosition: 'right',
        selectedPanel: currentState.selectedPanel
      });
      expect(getLastSetStateArgs()[0].selectedPanel).toBeUndefined();
    });
    it('should set selectedPanel initially', function () {
      var panelName = 'storybook/a11y/panel';
      layoutApi.setOptions({
        selectedPanel: panelName
      });
      expect(getLastSetStateArgs()[0].selectedPanel).toEqual(panelName);
    });
    it('should change selectedPanel if it is defined in the options and is different', function () {
      var panelName = 'storybook/a11y/panel';
      layoutApi.setOptions({});
      layoutApi.setOptions({
        selectedPanel: panelName
      });
      expect(getLastSetStateArgs()[0].selectedPanel).toEqual(panelName);
    });
  });
});