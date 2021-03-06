"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.fill");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.object.values");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _treeview = require("./treeview.mockdata");

var utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var noRoot = {
  dataset: _treeview.mockDataset.noRoot,
  selected: _treeview.mockSelected.noRoot,
  expanded: _treeview.mockExpanded.noRoot
};
var withRoot = {
  dataset: _treeview.mockDataset.withRoot,
  selected: _treeview.mockSelected.withRoot,
  expanded: _treeview.mockExpanded.withRoot
};
describe('sanity', function () {
  test('all exports should be functions', function () {
    Object.values(utils).forEach(function (i) {
      expect(_typeof(i)).toBe('function');
    });
  });
});
describe('keyEventToAction', function () {
  test('all known inputs should be transformed', function () {
    var inputs = [18, 32, 38, 40, 37, 39, 100];
    var output = inputs.map(function (k) {
      return utils.keyEventToAction({
        keyCode: k
      });
    });
    expect(output).toEqual(['ENTER', 'SPACE', 'UP', 'DOWN', 'LEFT', 'RIGHT', false]);
  });
  test('ctrlKey blocks transform', function () {
    var inputs = [18, 32, 38, 40, 37, 39, 100];
    var output = inputs.map(function (k) {
      return utils.keyEventToAction({
        keyCode: k,
        ctrlKey: true
      });
    });
    expect(output).toEqual(new Array(7).fill(false));
  });
  test('altKey blocks transform', function () {
    var inputs = [18, 32, 38, 40, 37, 39, 100];
    var output = inputs.map(function (k) {
      return utils.keyEventToAction({
        keyCode: k,
        altKey: true
      });
    });
    expect(output).toEqual(new Array(7).fill(false));
  });
  test('shiftKey blocks transform', function () {
    var inputs = [18, 32, 38, 40, 37, 39, 100];
    var output = inputs.map(function (k) {
      return utils.keyEventToAction({
        keyCode: k,
        shiftKey: true
      });
    });
    expect(output).toEqual(new Array(7).fill(false));
  });
  test('metaKey blocks transform', function () {
    var inputs = [18, 32, 38, 40, 37, 39, 100];
    var output = inputs.map(function (k) {
      return utils.keyEventToAction({
        keyCode: k,
        metaKey: true
      });
    });
    expect(output).toEqual(new Array(7).fill(false));
  });
});
describe('createId', function () {
  test('creates an id', function () {
    var inputs = ['testpath', 'testprefix'];
    var output = utils.createId.apply(utils, inputs);
    expect(output).toEqual('testprefix_testpath');
  });
});
describe('get', function () {
  test('retrieved by key', function () {
    var value = {};
    var inputs = ['testkey', {
      testkey: value,
      x: 'incorrect'
    }];
    var output = utils.get(inputs[0], inputs[1]);
    expect(output).toBe(value);
  });
  test('retrieve non-existent returns undefined', function () {
    var value = {};
    var inputs = ['NONEXISTENT', {
      testkey: value,
      x: 'incorrect'
    }];
    var output = utils.get(inputs[0], inputs[1]);
    expect(output).toBe(undefined);
  });
});
describe('getParent', function () {
  test('retrieved by id (level 0) returns undefined', function () {
    var output = utils.getParent('1', noRoot.dataset);
    expect(output).toBe(undefined);
  });
  test('retrieved by id (level 1) returns correctly', function () {
    var output = utils.getParent('1-12', noRoot.dataset);
    expect(output).toBe(noRoot.dataset['1']);
  });
  test('retrieved by id (level 2) returns correctly', function () {
    var output = utils.getParent('1-12-121', noRoot.dataset);
    expect(output).toBe(noRoot.dataset['1-12']);
  });
  test('retrieve non-existent returns undefined', function () {
    var output = utils.getParent('NONEXISTENT', noRoot.dataset);
    expect(output).toBe(undefined);
  });
});
describe('getParents', function () {
  test('retrieved by id (level 0) returns correctly', function () {
    var output = utils.getParents('1', noRoot.dataset);
    expect(output).toEqual([]);
  });
  test('retrieved by id (level 1) returns correctly', function () {
    var output = utils.getParents('1-12', noRoot.dataset);
    expect(output).toEqual([noRoot.dataset['1']]);
  });
  test('retrieved by id (level 2) returns correctly', function () {
    var output = utils.getParents('1-12-121', noRoot.dataset);
    expect(output).toEqual([noRoot.dataset['1-12'], noRoot.dataset['1']]);
  });
  test('retrieve non-existent returns empty array', function () {
    var output = utils.getParents('NONEXISTENT', noRoot.dataset);
    expect(output).toEqual([]);
  });
});
describe('getPrevious', function () {
  test('to previous sibling', function () {
    var output = utils.getPrevious(Object.assign({
      id: '1-12'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['1-11']);
  });
  test('to parent', function () {
    var output = utils.getPrevious(Object.assign({
      id: '1-11'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['1']);
  });
  test('to child of parent sibling', function () {
    var output = utils.getPrevious(Object.assign({
      id: '2'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['1-12']);
  });
  test('cannot go beyond first', function () {
    var output = utils.getPrevious(Object.assign({
      id: '1'
    }, noRoot));
    expect(output).toBe(undefined);
  });
  test('cannot go beyond first - parent is root', function () {
    var output = utils.getPrevious(Object.assign({
      id: '1-11'
    }, withRoot));
    expect(output).toBe(undefined);
  });
  test('to previous parent sibling - because parent is root', function () {
    var output = utils.getPrevious(Object.assign({
      id: '3-31'
    }, withRoot));
    expect(output).toBe(withRoot.dataset['2']);
  });
});
describe('getNext', function () {
  test('to next sibling level 1', function () {
    var output = utils.getNext(Object.assign({
      id: '1-11'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['1-12']);
  });
  test('to next sibling level 2', function () {
    var output = utils.getNext(Object.assign({
      id: '1-12-121'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['1-12-122']);
  });
  test('to next parent', function () {
    var output = utils.getNext(Object.assign({
      id: '1-12'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['2']);
  });
  test('to first child', function () {
    var output = utils.getNext(Object.assign({
      id: '1'
    }, noRoot));
    expect(output).toEqual(noRoot.dataset['1-11']);
  });
  test('cannot go beyond last', function () {
    var output = utils.getNext(Object.assign({
      id: '2-22'
    }, noRoot));
    expect(output).toBe(undefined);
  });
  test('to next sibling with root as parent', function () {
    var output = utils.getNext(Object.assign({
      id: '1-11'
    }, withRoot));
    expect(output).toBe(withRoot.dataset['1-12']);
  });
  test('to next parent with root as parent - skip root', function () {
    var output = utils.getNext(Object.assign({
      id: '1-12'
    }, withRoot));
    expect(output).toBe(withRoot.dataset['2']);
  });
});
describe('toId', function () {
  test('when base is empty', function () {
    var result = utils.toId('', 'test');
    expect(result).toBe('test');
  });
  test('when base has value', function () {
    var result = utils.toId('test', 'test');
    expect(result).toBe('test-test');
  });
});