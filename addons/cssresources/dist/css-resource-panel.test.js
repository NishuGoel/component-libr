"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-16"));

var _components = require("@storybook/components");

var _coreEvents = require("@storybook/core-events");

var _constants = require("./constants");

var _cssResourcePanel = require("./css-resource-panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
var defaultParameters = [{
  id: 'fake-css-id-1',
  code: 'fake-css-code-1',
  picked: true
}, {
  id: 'fake-css-id-2',
  code: 'fake-css-code-2',
  picked: false
}];
var newFakeParameters = [{
  id: 'new-fake-css-id-1',
  code: 'new-fake-css-code-1',
  picked: false
}, {
  id: 'new-fake-css-id-2',
  code: 'new-fake-css-code-2',
  picked: true
}];
var defaultProps = {
  active: true,
  api: {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    getParameters: jest.fn(function () {
      return defaultParameters;
    })
  }
};

var shallowNode = function shallowNode() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultProps;
  return (0, _enzyme.shallow)(_react["default"].createElement(_cssResourcePanel.CssResourcePanel, props));
};

var mountNode = function mountNode() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultProps;
  return (0, _enzyme.mount)(_react["default"].createElement(_cssResourcePanel.CssResourcePanel, props));
};

describe('CSSResourcePanel', function () {
  describe('constructor', function () {
    var node = mountNode();
    it('should initialize state', function () {
      expect(node).toHaveState({
        list: [],
        currentStoryId: ''
      });
    });
    it('should render an empty div', function () {
      expect(node.html()).toEqual('<div></div>');
    });
  });
  describe('componentDidMount', function () {
    var spy;
    afterEach(function () {
      spy.mockClear();
    });
    it('should execute when component is mounted', function () {
      spy = jest.spyOn(_cssResourcePanel.CssResourcePanel.prototype, 'componentDidMount');
      shallowNode();
      expect(spy).toHaveBeenCalled();
    });
    it('should add STORY_RENDERED listener to the api', function () {
      var apiAdd = jest.fn();
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          on: apiAdd
        })
      }));

      var _node$instance = node.instance(),
          onStoryChange = _node$instance.onStoryChange;

      expect(apiAdd).toHaveBeenCalledWith(_coreEvents.STORY_RENDERED, onStoryChange);
    });
  });
  describe('componentWillUnmount', function () {
    var spy;
    afterEach(function () {
      if (spy) {
        spy.mockClear();
      }
    });
    it('should execute when component is unmounted', function () {
      spy = jest.spyOn(_cssResourcePanel.CssResourcePanel.prototype, 'componentWillUnmount');
      shallowNode().unmount();
      expect(spy).toHaveBeenCalled();
    });
    it('should remove STORY_RENDERED listener from the api', function () {
      var apiRemove = jest.fn();
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          off: apiRemove
        })
      }));

      var _node$instance2 = node.instance(),
          onStoryChange = _node$instance2.onStoryChange;

      node.unmount();
      expect(apiRemove).toHaveBeenCalledWith(_coreEvents.STORY_RENDERED, onStoryChange);
    });
  });
  describe('onStoryChange', function () {
    it('should populate list with the default items', function () {
      var node = shallowNode();
      expect(node.state('list')).toMatchObject([]);
      node.instance().onStoryChange('fake-story-id');
      expect(node.state('list')).toMatchObject(defaultParameters);
    });
    it('should pull default items from getParameters', function () {
      var apiGetParameters = jest.fn(function () {
        return newFakeParameters;
      });
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          getParameters: apiGetParameters
        })
      }));
      expect(node.state('list')).toMatchObject([]);
      node.instance().onStoryChange('fake-story-id');
      expect(apiGetParameters).toHaveBeenCalledWith('fake-story-id', _constants.PARAM_KEY);
      expect(node.state('list')).toMatchObject(newFakeParameters);
    });
    it('should maintain picked attribute for matching ids', function () {
      var node = shallowNode();
      var invertedItem = Object.assign({}, defaultParameters[0], {
        picked: !defaultParameters[0].picked
      });
      node.setState({
        list: [invertedItem]
      });
      node.instance().onStoryChange('fake-story-id');
      expect(node.state('list')).toMatchObject([Object.assign({}, defaultParameters[0], {
        picked: !defaultParameters[0].picked
      })].concat(_toConsumableArray(defaultParameters.slice(1))));
    });
    it("should not overwrite list when story id hasn't changed", function () {
      var fakeList = [];
      var apiGetParameters = jest.fn(function () {
        return newFakeParameters;
      });
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          getParameters: apiGetParameters
        })
      }));
      node.setState({
        list: fakeList,
        currentStoryId: 'fake-story-id'
      });
      expect(node.state('list')).toEqual(fakeList);
      node.instance().onStoryChange('fake-story-id');
      expect(node.state('list')).toEqual(fakeList);
    });
    it('should not overwrite list when default list is undefined', function () {
      var fakeList = [];
      var apiGetParameters = jest.fn(function () {
        return undefined;
      });
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          getParameters: apiGetParameters
        })
      }));
      node.setState({
        list: fakeList
      });
      expect(node.state('list')).toEqual(fakeList);
      node.instance().onStoryChange('fake-story-id');
      expect(node.state('list')).toEqual(fakeList);
    });
  });
  describe('onChange', function () {
    var spy;
    afterEach(function () {
      if (spy) {
        spy.mockClear();
      }
    });
    var changedIndex = 1;
    var fakeEvent = {
      target: {
        id: defaultParameters[changedIndex].id,
        checked: true
      }
    };
    var newFakeList = defaultParameters.map(function (param, index) {
      return index === changedIndex ? Object.assign({}, param, {
        picked: true
      }) : param;
    });
    it('should update the list with new picked items', function () {
      var node = shallowNode();
      node.instance().onStoryChange('fake-story-id');
      node.instance().onChange(fakeEvent);
      expect(node.state('list')).toMatchObject(newFakeList);
    });
    it('should call emit method with updated list', function () {
      spy = jest.spyOn(_cssResourcePanel.CssResourcePanel.prototype, 'emit');
      var node = shallowNode();
      node.instance().onStoryChange('fake-story-id');
      node.instance().onChange(fakeEvent);
      expect(spy).toHaveBeenCalledWith(newFakeList);
    });
  });
  describe('emit', function () {
    it('should call emit from the api with EVENTS.SET', function () {
      var apiEmit = jest.fn();
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          emit: apiEmit
        })
      }));
      node.instance().emit(newFakeParameters);
      expect(apiEmit).toHaveBeenCalledWith(_constants.EVENTS.SET, newFakeParameters);
    });
  });
  describe('render', function () {
    it('should not render anything when not active', function () {
      var node = shallowNode(Object.assign({}, defaultProps, {
        active: false
      }));
      node.instance().onStoryChange('fake-story-id');
      expect(node).toBeEmptyRender();
    });
    describe('each list item', function () {
      var node = shallowNode();
      node.instance().onStoryChange('fake-story-id');
      defaultParameters.forEach(function (param) {
        it("should render list item with id '".concat(param.id, "'"), function () {
          expect(node.find("#".concat(param.id)).length).toEqual(1);
        });
        it("should render list item with id '".concat(param.id, "' as ").concat(param.picked ? 'checked' : 'unchecked'), function () {
          expect(node.find("#".concat(param.id)).first().prop('checked')).toBe(param.picked);
        });
      });
    });
    it('should not render code for items without a code', function () {
      var apiGetParameters = jest.fn(function () {
        return [{
          id: 'local-fake-id-1',
          picked: true
        }, {
          id: 'local-fake-id-2',
          code: 'local-fake-code-2',
          picked: false
        }];
      });
      var node = shallowNode(Object.assign({}, defaultProps, {
        api: Object.assign({}, defaultProps.api, {
          getParameters: apiGetParameters
        })
      }));
      node.instance().onStoryChange('fake-story-id');
      expect(node.find(_components.SyntaxHighlighter).length).toEqual(1);
    });
  });
});