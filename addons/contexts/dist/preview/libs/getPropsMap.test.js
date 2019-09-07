"use strict";

require("core-js/modules/es.array.concat");

var _getPropsMap = require("./getPropsMap");

var _constants = require("../../shared/constants");

describe('Test on behaviors from collecting the propsMap', function () {
  var someParams = [{
    name: 'A',
    props: {}
  }, {
    name: 'B',
    props: {}
  }];
  it('should return "null" when params in 0 length', function () {
    var result = (0, _getPropsMap._getPropsByParamName)([]);
    expect(result).toBe(null);
  });
  it('should return "OPT_OUT" token when the context being opted out', function () {
    var result = (0, _getPropsMap._getPropsByParamName)(someParams, _constants.OPT_OUT, {
      cancelable: true
    });
    expect(result).toBe(_constants.OPT_OUT);
  });
  it('should return the props from params when the name existed', function () {
    var target = {};
    var result = (0, _getPropsMap._getPropsByParamName)([].concat(someParams, [{
      name: 'C',
      props: target
    }]), 'C');
    expect(result).toBe(target);
  });
  it('should otherwise fallback to default props in params for a bad name', function () {
    var target = {};
    var result = (0, _getPropsMap._getPropsByParamName)([].concat(someParams, [{
      name: 'C',
      props: target,
      "default": true
    }]), 'X');
    expect(result).toBe(target);
  });
  it('should otherwise fallback to the first props in params for a bad name, if no marked default props', function () {
    var result = (0, _getPropsMap._getPropsByParamName)(someParams, 'A');
    expect(result).toBe(someParams[0].props);
  });
});
describe('Test on the integrity of the method to get the propMaps', function () {
  it('should return the correct propsMap from the specified selectionState', function () {
    // given
    var someContextNodes = [{
      components: ['div'],
      icon: 'box',
      nodeId: 'Some Context',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: 'A1',
        props: {
          a: 1
        }
      }, {
        name: 'A2',
        props: {
          a: 2
        },
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
        name: 'B',
        props: {
          b: 1
        }
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
        name: 'C',
        props: {
          c: 1
        }
      }],
      title: 'Other Contexts'
    }];
    var someSelectionState = {
      'Some Context': 'A1',
      'Another Context': _constants.OPT_OUT // an inconsistent but possible state being introduced via query param

    }; // when

    var result = (0, _getPropsMap.getPropsMap)(someContextNodes, someSelectionState); // then

    expect(result).toEqual({
      'Some Context': {
        a: 1
      },
      'Another Context': {
        b: 1
      },
      // not equal to `OPT_OUT` due to the context is not cancelable
      'Other Contexts': {
        c: 1
      }
    });
  });
});