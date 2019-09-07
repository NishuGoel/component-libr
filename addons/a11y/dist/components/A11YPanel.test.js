"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.iterator");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _theming = require("@storybook/theming");

var _coreEvents = require("@storybook/core-events");

var _components = require("@storybook/components");

var _A11YPanel = require("./A11YPanel");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function createApi() {
  return {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn()
  };
}

var axeResult = {
  incomplete: [{
    id: 'color-contrast',
    impact: 'serious',
    tags: ['cat.color', 'wcag2aa', 'wcag143'],
    description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
    help: 'Elements must have sufficient color contrast',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/color-contrast?application=axeAPI',
    nodes: []
  }],
  passes: [{
    id: 'aria-allowed-attr',
    impact: null,
    tags: ['cat.aria', 'wcag2a', 'wcag412'],
    description: "Ensures ARIA attributes are allowed for an element's role",
    help: 'Elements must only use allowed ARIA attributes',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/aria-allowed-attr?application=axeAPI',
    nodes: []
  }],
  violations: [{
    id: 'color-contrast',
    impact: 'serious',
    tags: ['cat.color', 'wcag2aa', 'wcag143'],
    description: 'Ensures the contrast between foreground and background colors meets WCAG 2 AA contrast ratio thresholds',
    help: 'Elements must have sufficient color contrast',
    helpUrl: 'https://dequeuniversity.com/rules/axe/3.2/color-contrast?application=axeAPI',
    nodes: []
  }]
};

function ThemedA11YPanel(props) {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: (0, _theming.convert)(_theming.themes.light)
  }, _react["default"].createElement(_A11YPanel.A11YPanel, props));
}

describe('A11YPanel', function () {
  it('should register STORY_RENDERED and RESULT updater on mount', function () {
    // given
    var api = createApi();
    expect(api.on).not.toHaveBeenCalled(); // when

    (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api
    })); // then

    expect(api.on.mock.calls.length).toBe(2);
    expect(api.on.mock.calls[0][0]).toBe(_coreEvents.STORY_RENDERED);
    expect(api.on.mock.calls[1][0]).toBe(_constants.EVENTS.RESULT);
  });
  it('should request a run on tab activation', function () {
    // given
    var api = createApi();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api
    }));
    expect(api.emit).not.toHaveBeenCalled(); // when

    wrapper.setProps({
      active: true
    });
    wrapper.update(); // then

    expect(api.emit).toHaveBeenCalledWith(_constants.EVENTS.REQUEST);
    expect(wrapper.find(_components.ScrollArea).length).toBe(0);
  });
  it('should deregister STORY_RENDERED and RESULT updater on unmount', function () {
    // given
    var api = createApi();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api
    }));
    expect(api.off).not.toHaveBeenCalled(); // when

    wrapper.unmount(); // then

    expect(api.off.mock.calls.length).toBe(2);
    expect(api.off.mock.calls[0][0]).toBe(_coreEvents.STORY_RENDERED);
    expect(api.off.mock.calls[1][0]).toBe(_constants.EVENTS.RESULT);
  });
  it('should update run result', function () {
    // given
    var api = createApi();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api,
      active: true
    }));
    var onUpdate = api.on.mock.calls.find(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 1),
          event = _ref2[0];

      return event === _constants.EVENTS.RESULT;
    })[1];
    expect(wrapper.find('button').last().text().trim()).toBe('Rerun tests'); // when

    onUpdate(axeResult); // then

    expect(wrapper.find('button').last().text().trim()).toBe('Tests completed');
  });
  it('should request run', function () {
    // given
    var api = createApi();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api,
      active: true
    }));
    var request = api.on.mock.calls.find(function (_ref3) {
      var _ref4 = _slicedToArray(_ref3, 1),
          event = _ref4[0];

      return event === _coreEvents.STORY_RENDERED;
    })[1];
    expect(wrapper.find('button').last().text().trim()).toBe('Rerun tests');
    expect(api.emit).not.toHaveBeenCalled(); // when

    request(); // then

    expect(wrapper.find('button').last().text().trim()).toBe('Running test');
    expect(api.emit).toHaveBeenCalledWith(_constants.EVENTS.REQUEST);
  });
  it('should NOT request run on inactive tab', function () {
    // given
    var api = createApi();
    (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api,
      active: false
    }));
    var request = api.on.mock.calls.find(function (_ref5) {
      var _ref6 = _slicedToArray(_ref5, 1),
          event = _ref6[0];

      return event === _coreEvents.STORY_RENDERED;
    })[1];
    expect(api.emit).not.toHaveBeenCalled(); // when

    request(); // then

    expect(api.emit).not.toHaveBeenCalled();
  });
  it('should render report', function () {
    // given
    var api = createApi();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api,
      active: true
    }));
    var onUpdate = api.on.mock.calls.find(function (_ref7) {
      var _ref8 = _slicedToArray(_ref7, 1),
          event = _ref8[0];

      return event === _constants.EVENTS.RESULT;
    })[1]; // when

    onUpdate(axeResult); // then

    expect(wrapper.find(_A11YPanel.A11YPanel)).toMatchSnapshot();
  });
  it("should render loader when it's running", function () {
    // given
    var api = createApi();
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api,
      active: true
    }));
    var request = api.on.mock.calls.find(function (_ref9) {
      var _ref10 = _slicedToArray(_ref9, 1),
          event = _ref10[0];

      return event === _coreEvents.STORY_RENDERED;
    })[1]; // when

    request();
    wrapper.update(); // then

    expect(wrapper.find('ScrollArea').length).toBe(0);
    expect(wrapper.find('Loader').length).toBe(1);
    expect(wrapper.find('ActionBar').length).toBe(1);
    expect(wrapper.find('Loader')).toMatchSnapshot();
  });
  it('should NOT anything when tab is not active', function () {
    // given
    var api = createApi(); // when

    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(ThemedA11YPanel, {
      api: api,
      active: false
    })); // then

    expect(wrapper.find('ScrollArea').length).toBe(0);
    expect(wrapper.find('ActionBar').length).toBe(0);
  });
});