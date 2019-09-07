"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

var _constants = require("@storybook/addon-contexts/src/shared/constants");

var _client_api = require("./client_api");

var _hooks = require("./hooks");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

jest.mock('@storybook/client-logger', function () {
  return {
    logger: {
      warn: jest.fn(),
      log: jest.fn()
    }
  };
});
var mockChannel;
beforeEach(function () {
  mockChannel = {
    emit: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn()
  };
});
jest.mock('@storybook/addons', function () {
  return {
    getChannel: function getChannel() {
      return mockChannel;
    }
  };
});
var decorateStory = (0, _hooks.applyHooks)(_client_api.defaultDecorateStory);

var run = function run(storyFn) {
  var decorators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var context = arguments.length > 2 ? arguments[2] : undefined;
  return decorateStory(storyFn, decorators)(context);
};

describe('Preview hooks', function () {
  describe('useEffect', function () {
    it('triggers the effect from story function', function () {
      var effect = jest.fn();
      run(function () {
        (0, _hooks.useEffect)(effect);
      });
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('triggers the effect from decorator', function () {
      var effect = jest.fn();
      run(function () {}, [function (storyFn) {
        (0, _hooks.useEffect)(effect);
        return storyFn();
      }]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('triggers the effect from decorator if story call comes before useEffect', function () {
      var effect = jest.fn();
      run(function () {}, [function (storyFn) {
        var story = storyFn();
        (0, _hooks.useEffect)(effect);
        return story;
      }]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('retriggers the effect if no deps array is provided', function () {
      var effect = jest.fn();

      var storyFn = function storyFn() {
        (0, _hooks.useEffect)(effect);
      };

      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(2);
    });
    it("doesn't retrigger the effect if empty deps array is provided", function () {
      var effect = jest.fn();

      var storyFn = function storyFn() {
        (0, _hooks.useEffect)(effect, []);
      };

      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it("doesn't retrigger the effect from decorator if story has changed", function () {
      var effect = jest.fn();

      var decorator = function decorator(storyFn) {
        (0, _hooks.useEffect)(effect, []);
        return storyFn();
      };

      run(function () {}, [decorator]);
      run(function () {}, [decorator]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it("doesn't retrigger the effect from decorator if story has changed and story call comes before useEffect", function () {
      var effect = jest.fn();

      var decorator = function decorator(storyFn) {
        var story = storyFn();
        (0, _hooks.useEffect)(effect, []);
        return story;
      };

      run(function () {}, [decorator]);
      run(function () {}, [decorator]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('retriggers the effect if some of the deps are changed', function () {
      var effect = jest.fn();
      var counter = 0;

      var storyFn = function storyFn() {
        (0, _hooks.useEffect)(effect, [counter]);
        counter += 1;
      };

      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(2);
    });
    it("doesn't retrigger the effect if none of the deps are changed", function () {
      var effect = jest.fn();

      var storyFn = function storyFn() {
        (0, _hooks.useEffect)(effect, [0]);
      };

      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('performs cleanup when retriggering', function () {
      var destroy = jest.fn();

      var storyFn = function storyFn() {
        (0, _hooks.useEffect)(function () {
          return destroy;
        });
      };

      run(storyFn);
      run(storyFn);
      expect(destroy).toHaveBeenCalledTimes(1);
    });
    it("doesn't perform cleanup when keeping the current effect", function () {
      var destroy = jest.fn();

      var storyFn = function storyFn() {
        (0, _hooks.useEffect)(function () {
          return destroy;
        }, []);
      };

      run(storyFn);
      run(storyFn);
      expect(destroy).not.toHaveBeenCalled();
    });
    it('performs cleanup when removing the decorator', function () {
      var destroy = jest.fn();
      run(function () {}, [function (storyFn) {
        (0, _hooks.useEffect)(function () {
          return destroy;
        });
        return storyFn();
      }]);
      run(function () {});
      expect(destroy).toHaveBeenCalledTimes(1);
    });
  });
  describe('useChannel', function () {
    it('calls .on when rendering the decorator', function () {
      var handler = function handler() {};

      run(function () {}, [function (storyFn) {
        (0, _hooks.useChannel)({
          SOME_EVENT: handler
        });
        return storyFn();
      }]);
      expect(mockChannel.on).toHaveBeenCalledTimes(1);
      expect(mockChannel.removeListener).toHaveBeenCalledTimes(0);
    });
    it('calls .removeListener when removing the decorator', function () {
      var handler = function handler() {};

      run(function () {}, [function (storyFn) {
        (0, _hooks.useChannel)({
          SOME_EVENT: handler
        });
        return storyFn();
      }]);
      expect(mockChannel.on).toHaveBeenCalledTimes(1);
      expect(mockChannel.removeListener).toHaveBeenCalledTimes(0);
      run(function () {});
      expect(mockChannel.removeListener).toHaveBeenCalledTimes(1);
    });
  });
  describe('useStoryContext', function () {
    it('returns current context', function () {
      var context = {};
      run(function () {
        expect((0, _hooks.useStoryContext)()).toBe(context);
      }, [], context);
    });
  });
  describe('useParameter', function () {
    it('will pull value from storyStore', function () {
      run(function () {}, [function (storyFn) {
        expect((0, _hooks.useParameter)('foo', 4)).toEqual(42);
        return storyFn();
      }], {
        parameters: {
          foo: 42
        }
      });
    });
    it('will return default value', function () {
      run(function () {}, [function (storyFn) {
        expect((0, _hooks.useParameter)('bar', 4)).toEqual(4);
        return storyFn();
      }], {
        parameters: {}
      });
    });
    it('will return undefined when no value is found', function () {
      run(function () {}, [function (storyFn) {
        expect((0, _hooks.useParameter)('bar')).toBe(undefined);
        return storyFn();
      }], {
        parameters: {}
      });
    });
  });
  describe('useMemo', function () {
    it('performs the calculation', function () {
      var result;
      var nextCreate = jest.fn(function () {
        return 'foo';
      });

      var storyFn = function storyFn() {
        result = (0, _hooks.useMemo)(nextCreate, []);
      };

      run(storyFn);
      expect(nextCreate).toHaveBeenCalledTimes(1);
      expect(result).toBe('foo');
    });
    it('performs the calculation once if deps are unchanged', function () {
      var result;
      var nextCreate = jest.fn(function () {
        return 'foo';
      });

      var storyFn = function storyFn() {
        result = (0, _hooks.useMemo)(nextCreate, []);
      };

      run(storyFn);
      run(storyFn);
      expect(nextCreate).toHaveBeenCalledTimes(1);
      expect(result).toBe('foo');
    });
    it('performs the calculation again if deps are changed', function () {
      var result;
      var counter = 0;
      var nextCreate = jest.fn(function () {
        return counter;
      });

      var storyFn = function storyFn() {
        counter += 1;
        result = (0, _hooks.useMemo)(nextCreate, [counter]);
      };

      run(storyFn);
      run(storyFn);
      expect(nextCreate).toHaveBeenCalledTimes(2);
      expect(result).toBe(counter);
    });
  });
  describe('useCallback', function () {
    it('returns the callback', function () {
      var result;

      var callback = function callback() {};

      var storyFn = function storyFn() {
        result = (0, _hooks.useCallback)(callback, []);
      };

      run(storyFn);
      expect(result).toBe(callback);
    });
    it('returns the previous callback reference if deps are unchanged', function () {
      var callbacks = [];

      var storyFn = function storyFn() {
        var callback = (0, _hooks.useCallback)(function () {}, []);
        callbacks.push(callback);
      };

      run(storyFn);
      run(storyFn);
      expect(callbacks[0]).toBe(callbacks[1]);
    });
    it('creates new callback reference if deps are changed', function () {
      var callbacks = [];
      var counter = 0;

      var storyFn = function storyFn() {
        counter += 1;
        var callback = (0, _hooks.useCallback)(function () {}, [counter]);
        callbacks.push(callback);
      };

      run(storyFn);
      run(storyFn);
      expect(callbacks[0]).not.toBe(callbacks[1]);
    });
  });
  describe('useRef', function () {
    it('attaches initial value', function () {
      var ref;

      var storyFn = function storyFn() {
        ref = (0, _hooks.useRef)('foo');
      };

      run(storyFn);
      expect(ref.current).toBe('foo');
    });
    it('stores mutations', function () {
      var refValueFromSecondRender;
      var counter = 0;

      var storyFn = function storyFn() {
        counter += 1;
        var ref = (0, _hooks.useRef)('foo');

        if (counter === 1) {
          ref.current = 'bar';
        } else {
          refValueFromSecondRender = ref.current;
        }
      };

      run(storyFn);
      run(storyFn);
      expect(refValueFromSecondRender).toBe('bar');
    });
  });
  describe('useState', function () {
    it('sets initial state', function () {
      var state;

      var storyFn = function storyFn() {
        var _useState = (0, _hooks.useState)('foo');

        var _useState2 = _slicedToArray(_useState, 1);

        state = _useState2[0];
      };

      run(storyFn);
      expect(state).toBe('foo');
    });
    it('calculates initial state', function () {
      var state;

      var storyFn = function storyFn() {
        var _useState3 = (0, _hooks.useState)(function () {
          return 'foo';
        });

        var _useState4 = _slicedToArray(_useState3, 1);

        state = _useState4[0];
      };

      run(storyFn);
      expect(state).toBe('foo');
    });
    it('performs synchronous state updates', function () {
      var state;
      var setState;
      var storyFn = jest.fn(function () {
        var _useState5 = (0, _hooks.useState)('foo');

        var _useState6 = _slicedToArray(_useState5, 2);

        state = _useState6[0];
        setState = _useState6[1];

        if (state === 'foo') {
          setState('bar');
        }
      });
      run(storyFn);
      expect(storyFn).toHaveBeenCalledTimes(2);
      expect(state).toBe('bar');
    });
    it('performs synchronous state updates with updater function', function () {
      var state;
      var setState;
      var storyFn = jest.fn(function () {
        var _useState7 = (0, _hooks.useState)(0);

        var _useState8 = _slicedToArray(_useState7, 2);

        state = _useState8[0];
        setState = _useState8[1];

        if (state < 3) {
          setState(function (prevState) {
            return prevState + 1;
          });
        }
      });
      run(storyFn);
      expect(storyFn).toHaveBeenCalledTimes(4);
      expect(state).toBe(3);
    });
    it('performs asynchronous state updates', function () {
      var state;
      var setState;
      var storyFn = jest.fn(function () {
        var _useState9 = (0, _hooks.useState)('foo');

        var _useState10 = _slicedToArray(_useState9, 2);

        state = _useState10[0];
        setState = _useState10[1];
      });
      run(storyFn);
      setState('bar');
      expect(mockChannel.emit).toHaveBeenCalledWith(_constants.FORCE_RE_RENDER);
      run(storyFn);
      expect(state).toBe('bar');
    });
  });
  describe('useReducer', function () {
    it('sets initial state', function () {
      var state;

      var storyFn = function storyFn() {
        var _useReducer = (0, _hooks.useReducer)(function () {
          return 'bar';
        }, 'foo');

        var _useReducer2 = _slicedToArray(_useReducer, 1);

        state = _useReducer2[0];
      };

      run(storyFn);
      expect(state).toBe('foo');
    });
    it('calculates initial state', function () {
      var state;

      var storyFn = function storyFn() {
        var _useReducer3 = (0, _hooks.useReducer)(function () {
          return 'bar';
        }, 'foo', function (arg) {
          return arg;
        });

        var _useReducer4 = _slicedToArray(_useReducer3, 1);

        state = _useReducer4[0];
      };

      run(storyFn);
      expect(state).toBe('foo');
    });
    it('performs synchronous state updates', function () {
      var state;
      var dispatch;
      var storyFn = jest.fn(function () {
        var _useReducer5 = (0, _hooks.useReducer)(function (prevState, action) {
          switch (action) {
            case 'INCREMENT':
              return prevState + 1;

            default:
              return prevState;
          }
        }, 0);

        var _useReducer6 = _slicedToArray(_useReducer5, 2);

        state = _useReducer6[0];
        dispatch = _useReducer6[1];

        if (state < 3) {
          dispatch('INCREMENT');
        }
      });
      run(storyFn);
      expect(storyFn).toHaveBeenCalledTimes(4);
      expect(state).toBe(3);
    });
    it('performs asynchronous state updates', function () {
      var state;
      var dispatch;
      var storyFn = jest.fn(function () {
        var _useReducer7 = (0, _hooks.useReducer)(function (prevState, action) {
          switch (action) {
            case 'INCREMENT':
              return prevState + 1;

            default:
              return prevState;
          }
        }, 0);

        var _useReducer8 = _slicedToArray(_useReducer7, 2);

        state = _useReducer8[0];
        dispatch = _useReducer8[1];
      });
      run(storyFn);
      dispatch('INCREMENT');
      expect(mockChannel.emit).toHaveBeenCalledWith(_constants.FORCE_RE_RENDER);
      run(storyFn);
      expect(state).toBe(1);
    });
  });
});