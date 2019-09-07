"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _getContextNodes = require("./getContextNodes");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

describe('Test on the merging result of a pair of settings', function () {
  it('should retain the basic structure even receiving empty objects', function () {
    // when
    var result = (0, _getContextNodes._getMergedSettings)({}, {}); // then

    expect(result).toEqual({
      components: [],
      icon: '',
      nodeId: '',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: '',
        props: {}
      }],
      title: ''
    });
  });
  it('should correctly merge two settings', function () {
    // given
    var someTopLevelSettings = {
      icon: 'box',
      title: 'Some Context',
      components: ['div'],
      params: [{
        name: 'T1',
        props: {}
      }, {
        name: 'T2',
        props: {}
      }],
      options: {
        cancelable: true,
        disable: true
      }
    };
    var someStoryLevelSettings = {
      icon: 'box',
      title: 'Some Context',
      components: ['span'],
      params: [{
        name: 'S1',
        props: {}
      }, {
        name: 'S2',
        props: {}
      }],
      options: {
        deep: true,
        disable: false
      }
    }; // when

    var result = (0, _getContextNodes._getMergedSettings)(someTopLevelSettings, someStoryLevelSettings); // then

    expect(result).toEqual({
      // topLevel over storyLevel
      nodeId: someTopLevelSettings.title,
      icon: someTopLevelSettings.icon,
      title: someTopLevelSettings.title,
      components: someTopLevelSettings.components,
      // storyLevel appends to topLevel
      params: [].concat(_toConsumableArray(someTopLevelSettings.params), _toConsumableArray(someStoryLevelSettings.params)),
      // storyLevel over topLevel
      options: {
        cancelable: someTopLevelSettings.options.cancelable,
        deep: someStoryLevelSettings.options.deep,
        disable: someStoryLevelSettings.options.disable
      }
    });
  });
});
describe('Test on reconciliation of settings', function () {
  it('should have a stable array ordering after normalization', function () {
    // when
    var result = (0, _getContextNodes.getContextNodes)({
      // from the topLevel
      options: [{
        icon: 'box',
        title: 'Some Context',
        components: ['div'],
        params: [{
          name: 'T1',
          props: {}
        }]
      }, {
        icon: 'box',
        title: 'Another Context',
        components: ['div'],
        params: [{
          name: 'T2',
          props: {}
        }]
      }],
      // from the storyLevel
      parameters: [{
        icon: 'box',
        title: 'Other Contexts',
        components: ['span'],
        params: [{
          name: 'S1',
          props: {}
        }]
      }, {
        icon: 'box',
        title: 'Some Context',
        components: ['p'],
        params: [{
          name: 'S2',
          props: {},
          "default": true
        }]
      }]
    }); // then

    expect(result).toEqual([{
      components: ['div'],
      icon: 'box',
      nodeId: 'Some Context',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: 'T1',
        props: {}
      }, {
        name: 'S2',
        props: {},
        "default": true
      }],
      title: 'Some Context'
    }, {
      components: ['div'],
      icon: 'box',
      nodeId: 'Another Context',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: 'T2',
        props: {}
      }],
      title: 'Another Context'
    }, {
      components: ['span'],
      icon: 'box',
      nodeId: 'Other Contexts',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: 'S1',
        props: {}
      }],
      title: 'Other Contexts'
    }]);
  });
});