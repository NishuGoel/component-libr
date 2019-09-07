"use strict";

var _getRendererFrom = require("./getRendererFrom");

var _constants = require("../../shared/constants");

// mocks
var h = jest.fn();
var spiedAggregator = (0, _getRendererFrom._getAggregatedWrap)(h);
beforeEach(function () {
  h.mockReset();
}); // tests

describe('Test on aggregation of a single context', function () {
  var fakeTag = 'fakeTag';

  var fakeComponent = function fakeComponent() {
    return '';
  };

  it('should skip wrapping when being set to disable', function () {
    // given
    var testedProps = {};
    var testedOption = {
      disable: true
    }; // when

    spiedAggregator([fakeTag, fakeComponent], testedProps, testedOption)(); // then

    expect(h).toHaveBeenCalledTimes(0);
  });
  it('should skip wrapping when props is marked as "OPT_OUT"', function () {
    // given
    var testedProps = _constants.OPT_OUT;
    var testedOption = {
      cancelable: true
    }; // when

    spiedAggregator([fakeTag, fakeComponent], testedProps, testedOption)(); // then

    expect(h).toHaveBeenCalledTimes(0);
  });
  it('should wrap components in the stacking order', function () {
    // given
    var testedProps = {};
    var testedOption = {}; // when

    spiedAggregator([fakeTag, fakeComponent], testedProps, testedOption)(); // then

    expect(h).toHaveBeenCalledTimes(2);
    expect(h.mock.calls[0][0]).toBe(fakeComponent);
    expect(h.mock.calls[1][0]).toBe(fakeTag);
  });
  it('should NOT pass props deeply by default', function () {
    // given
    var testedProps = {};
    var testedOption = {}; // when

    spiedAggregator([fakeTag, fakeComponent], testedProps, testedOption)(); // then

    expect(h.mock.calls[0][1]).toBe(null);
    expect(h.mock.calls[1][1]).toBe(testedProps);
  });
  it('should pass props deeply', function () {
    var testedProps = {};
    var testedOption = {
      deep: true
    };
    spiedAggregator([fakeTag, fakeComponent], testedProps, testedOption)();
    expect(h.mock.calls[0][1]).toBe(testedProps);
    expect(h.mock.calls[1][1]).toBe(testedProps);
  });
});
describe('Test on aggregation of contexts', function () {
  it('should aggregate contexts in the stacking order', function () {
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
        name: 'A',
        props: {}
      }],
      title: 'Some Context'
    }, {
      components: ['span'],
      icon: 'box',
      nodeId: 'Another Context',
      options: {
        cancelable: false,
        deep: false,
        disable: false
      },
      params: [{
        name: 'B',
        props: {}
      }],
      title: 'Another Context'
    }];
    var propsMap = {
      'Some Context': {},
      'Another Context': {}
    }; // when

    (0, _getRendererFrom.getRendererFrom)(h)(someContextNodes, propsMap, function () {}); // then

    expect(h.mock.calls[0][0]).toBe(someContextNodes[1].components[0]);
    expect(h.mock.calls[1][0]).toBe(someContextNodes[0].components[0]);
  });
});