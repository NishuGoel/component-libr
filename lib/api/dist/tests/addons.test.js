"use strict";

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _addons = _interopRequireWildcard(require("../modules/addons"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PANELS = {
  a11y: {
    title: 'Accessibility',
    paramKey: 'a11y'
  },
  actions: {
    title: 'Actions',
    paramKey: 'actions'
  },
  knobs: {
    title: 'Knobs',
    paramKey: 'knobs'
  }
};
var provider = {
  getElements: function getElements(type) {
    if (type === _addons.types.PANEL) {
      return PANELS;
    }

    return null;
  }
};
var store = {
  getState: function getState() {
    return {
      selectedPanel: ''
    };
  },
  setState: jest.fn()
};
describe('Addons API', function () {
  describe('#getElements', function () {
    it('should return provider elements', function () {
      // given
      var _initAddons = (0, _addons["default"])({
        provider: provider,
        store: store
      }),
          api = _initAddons.api; // when


      var panels = api.getElements(_addons.types.PANEL); // then

      expect(panels).toBe(PANELS);
    });
  });
  describe('#getPanels', function () {
    it('should return provider panels', function () {
      // given
      var _initAddons2 = (0, _addons["default"])({
        provider: provider,
        store: store
      }),
          api = _initAddons2.api; // when


      var panels = api.getPanels(); // then

      expect(panels).toBe(PANELS);
    });
  });
  describe('#getStoryPanels', function () {
    it('should return all panels by default', function () {
      // given
      var _initAddons3 = (0, _addons["default"])({
        provider: provider,
        store: store
      }),
          api = _initAddons3.api; // when


      var filteredPanels = api.getStoryPanels(); // then

      expect(filteredPanels).toBe(PANELS);
    });
    it('should filter disabled addons', function () {
      // given
      var storyId = 'story 1';
      var storeWithStory = {
        getState: function getState() {
          return {
            storyId: storyId,
            storiesHash: _defineProperty({}, storyId, {
              parameters: {
                a11y: {
                  disabled: true
                }
              }
            })
          };
        },
        setState: jest.fn()
      };

      var _initAddons4 = (0, _addons["default"])({
        provider: provider,
        store: storeWithStory
      }),
          api = _initAddons4.api; // when


      var filteredPanels = api.getStoryPanels(); // then

      expect(filteredPanels).toEqual({
        actions: PANELS.actions,
        knobs: PANELS.knobs
      });
    });
  });
  describe('#getSelectedPanel', function () {
    it('should return provider panels', function () {
      // given
      var storeWithSelectedPanel = {
        getState: function getState() {
          return {
            selectedPanel: 'actions'
          };
        },
        setState: jest.fn()
      };

      var _initAddons5 = (0, _addons["default"])({
        provider: provider,
        store: storeWithSelectedPanel
      }),
          api = _initAddons5.api; // when


      var selectedPanel = api.getSelectedPanel(); // then

      expect(selectedPanel).toBe('actions');
    });
    it('should return first panel when selected is not a panel', function () {
      // given
      var storeWithSelectedPanel = {
        getState: function getState() {
          return {
            selectedPanel: 'unknown'
          };
        },
        setState: jest.fn()
      };

      var _initAddons6 = (0, _addons["default"])({
        provider: provider,
        store: storeWithSelectedPanel
      }),
          api = _initAddons6.api; // when


      var selectedPanel = api.getSelectedPanel(); // then

      expect(selectedPanel).toBe('a11y');
    });
  });
  describe('#setSelectedPanel', function () {
    it('should set value inn store', function () {
      // given
      var setState = jest.fn();
      var storeWithSelectedPanel = {
        getState: function getState() {
          return {
            selectedPanel: 'actions'
          };
        },
        setState: setState
      };

      var _initAddons7 = (0, _addons["default"])({
        provider: provider,
        store: storeWithSelectedPanel
      }),
          api = _initAddons7.api;

      expect(setState).not.toHaveBeenCalled(); // when

      api.setSelectedPanel('knobs'); // then

      expect(setState).toHaveBeenCalledWith({
        selectedPanel: 'knobs'
      }, {
        persistence: 'session'
      });
    });
  });
});