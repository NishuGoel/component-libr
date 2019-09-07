"use strict";

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _coreEvents = require("@storybook/core-events");

var _components = require("@storybook/components");

var _theming = require("@storybook/theming");

var _Panel = _interopRequireWildcard(require("../Panel"));

var _shared = require("../../shared");

var _PropForm = _interopRequireDefault(require("../PropForm"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var createTestApi = function createTestApi() {
  return {
    on: jest.fn(),
    emit: jest.fn()
  };
}; // React.memo in Tabs is causing problems with enzyme, probably
// due to https://github.com/airbnb/enzyme/issues/1875, so this
// is a workaround


jest.mock('react', function () {
  var r = jest.requireActual('react');
  return Object.assign({}, r, {
    memo: function memo(x) {
      return x;
    }
  });
});
describe('Panel', function () {
  it('should subscribe to setKnobs event of channel', function () {
    var testApi = createTestApi();
    (0, _enzyme.shallow)(_react["default"].createElement(_Panel["default"], {
      api: testApi,
      active: true
    }));
    expect(testApi.on).toHaveBeenCalledWith(_shared.SET, expect.any(Function));
  });
  it('should subscribe to STORY_CHANGE event', function () {
    var testApi = createTestApi();
    (0, _enzyme.shallow)(_react["default"].createElement(_Panel["default"], {
      api: testApi,
      active: true
    }));
    expect(testApi.on.mock.calls).toContainEqual([_coreEvents.STORY_CHANGED, expect.any(Function)]);
    expect(testApi.on).toHaveBeenCalledWith(_shared.SET, expect.any(Function));
  });
  describe('setKnobs handler', function () {
    it('should read url params and set values for existing knobs', function () {
      var handlers = {};
      var testQueryParams = {
        'knob-foo': 'test string',
        bar: 'some other string'
      };
      var testApi = {
        on: function on(e, handler) {
          handlers[e] = handler;
        },
        emit: jest.fn(),
        getQueryParam: function getQueryParam(key) {
          return testQueryParams[key];
        },
        setQueryParams: jest.fn()
      };
      (0, _enzyme.shallow)(_react["default"].createElement(_Panel["default"], {
        api: testApi,
        active: true
      }));
      var setKnobsHandler = handlers[_shared.SET];
      var knobs = {
        foo: {
          name: 'foo',
          value: 'default string',
          type: 'text'
        },
        baz: {
          name: 'baz',
          value: 'another knob value',
          type: 'text'
        }
      };
      setKnobsHandler({
        knobs: knobs,
        timestamp: +new Date()
      });
      var knobFromUrl = {
        name: 'foo',
        value: testQueryParams['knob-foo'],
        type: 'text'
      };
      var e = _shared.CHANGE;
      expect(testApi.emit).toHaveBeenCalledWith(e, knobFromUrl);
    });
  });
  describe('handleChange()', function () {
    it('should set queryParams and emit knobChange event', function () {
      var testApi = {
        getQueryParam: jest.fn(),
        setQueryParams: jest.fn(),
        on: jest.fn(),
        emit: jest.fn()
      };
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Panel["default"], {
        api: testApi,
        active: true
      }));
      var testChangedKnob = {
        name: 'foo',
        value: 'changed text',
        type: 'text'
      };
      wrapper.instance().handleChange(testChangedKnob);
      expect(testApi.emit).toHaveBeenCalledWith(_shared.CHANGE, testChangedKnob); // const paramsChange = { 'knob-foo': 'changed text' };
      // expect(testApi.setQueryParams).toHaveBeenCalledWith(paramsChange);
    });
  });
  describe('groups', function () {
    var testApi = {
      off: jest.fn(),
      emit: jest.fn(),
      getQueryParam: jest.fn(),
      setQueryParams: jest.fn(),
      on: jest.fn(function () {
        return function () {};
      })
    };
    it('should have no tabs when there are no groupIds', function () {
      // Unfortunately, a shallow render will not invoke the render() function of the groups --
      // it thinks they are unnamed function components (what they effectively are anyway).
      //
      // We have to do a full mount.
      var root = (0, _enzyme.mount)(_react["default"].createElement(_theming.ThemeProvider, {
        theme: (0, _theming.convert)(_theming.themes.light)
      }, _react["default"].createElement(_Panel["default"], {
        api: testApi,
        active: true
      })));
      testApi.on.mock.calls[0][1]({
        knobs: {
          foo: {
            name: 'foo',
            defaultValue: 'test',
            used: true // no groupId

          },
          bar: {
            name: 'bar',
            defaultValue: 'test2',
            used: true // no groupId

          }
        }
      });
      var wrapper = root.update().find(_Panel["default"]);
      var formWrapper = wrapper.find(_PropForm["default"]);
      var knobs = formWrapper.map(function (formInstanceWrapper) {
        return formInstanceWrapper.prop('knobs');
      });
      expect(knobs).toMatchSnapshot();
      root.unmount();
    });
    it('should have one tab per groupId when all are defined', function () {
      var root = (0, _enzyme.mount)(_react["default"].createElement(_theming.ThemeProvider, {
        theme: (0, _theming.convert)(_theming.themes.light)
      }, _react["default"].createElement(_Panel["default"], {
        api: testApi,
        active: true
      })));
      testApi.on.mock.calls[0][1]({
        knobs: {
          foo: {
            name: 'foo',
            defaultValue: 'test',
            used: true,
            groupId: 'foo'
          },
          bar: {
            name: 'bar',
            defaultValue: 'test2',
            used: true,
            groupId: 'bar'
          }
        }
      });
      var wrapper = root.update().find(_Panel["default"]);
      var titles = wrapper.find(_components.TabsState).find('button').map(function (child) {
        return child.prop('children');
      });
      expect(titles).toEqual(['foo', 'bar']);
      var knobs = wrapper.find(_PropForm["default"]); // but it should not have its own PropForm in this case

      expect(knobs.length).toEqual(titles.length);
      expect(knobs).toMatchSnapshot();
      root.unmount();
    });
    it("the ".concat(_Panel.DEFAULT_GROUP_ID, " tab should have its own additional content when there are knobs both with and without a groupId"), function () {
      var root = (0, _enzyme.mount)(_react["default"].createElement(_theming.ThemeProvider, {
        theme: (0, _theming.convert)(_theming.themes.light)
      }, _react["default"].createElement(_Panel["default"], {
        api: testApi,
        active: true
      })));
      testApi.on.mock.calls[0][1]({
        knobs: {
          bar: {
            name: 'bar',
            defaultValue: 'test2',
            used: true // no groupId

          },
          foo: {
            name: 'foo',
            defaultValue: 'test',
            used: true,
            groupId: 'foo'
          }
        }
      });
      var wrapper = root.update().find(_Panel["default"]);
      var titles = wrapper.find(_components.TabsState).find('button').map(function (child) {
        return child.prop('children');
      });
      expect(titles).toEqual(['foo', _Panel.DEFAULT_GROUP_ID]);
      var knobs = wrapper.find(_PropForm["default"]).map(function (propForm) {
        return propForm.prop('knobs');
      }); // there are props with no groupId so Other should also have its own PropForm

      expect(knobs.length).toEqual(titles.length);
      expect(knobs).toMatchSnapshot();
      root.unmount();
    });
  });
});