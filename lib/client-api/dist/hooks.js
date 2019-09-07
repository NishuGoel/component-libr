"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.every");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.is-array");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.set");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMemo = useMemo;
exports.useCallback = useCallback;
exports.useRef = useRef;
exports.useState = useState;
exports.useReducer = useReducer;
exports.useEffect = useEffect;
exports.useChannel = useChannel;
exports.useStoryContext = useStoryContext;
exports.useParameter = useParameter;
exports.applyHooks = void 0;

var _clientLogger = require("@storybook/client-logger");

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _coreEvents = require("@storybook/core-events");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var hookListsMap = new WeakMap();
var mountedDecorators = new Set();
var currentHooks = [];
var nextHookIndex = 0;

var getNextHook = function getNextHook() {
  var hook = currentHooks[nextHookIndex];
  nextHookIndex += 1;
  return hook;
};

var currentPhase = 'NONE';
var currentEffects = [];
var prevEffects = [];
var currentDecoratorName = null;
var hasUpdates = false;
var currentContext = null;

var triggerEffects = function triggerEffects() {
  // destroy removed effects
  prevEffects.forEach(function (effect) {
    if (!currentEffects.includes(effect) && effect.destroy) {
      effect.destroy();
    }
  }); // trigger added effects

  currentEffects.forEach(function (effect) {
    if (!prevEffects.includes(effect)) {
      // eslint-disable-next-line no-param-reassign
      effect.destroy = effect.create();
    }
  });
  prevEffects = currentEffects;
  currentEffects = [];
};

var hookify = function hookify(fn) {
  return function () {
    var prevPhase = currentPhase;
    var prevHooks = currentHooks;
    var prevNextHookIndex = nextHookIndex;
    var prevDecoratorName = currentDecoratorName;
    currentDecoratorName = fn.name;

    if (mountedDecorators.has(fn)) {
      currentPhase = 'UPDATE';
      currentHooks = hookListsMap.get(fn) || [];
    } else {
      currentPhase = 'MOUNT';
      currentHooks = [];
      hookListsMap.set(fn, currentHooks);
    }

    nextHookIndex = 0;
    var result = fn.apply(void 0, arguments);

    if (currentPhase === 'UPDATE' && getNextHook() != null) {
      throw new Error('Rendered fewer hooks than expected. This may be caused by an accidental early return statement.');
    }

    currentPhase = prevPhase;
    currentHooks = prevHooks;
    nextHookIndex = prevNextHookIndex;
    currentDecoratorName = prevDecoratorName;
    return result;
  };
}; // Counter to prevent infinite loops.


var numberOfRenders = 0;
var RENDER_LIMIT = 25;

var applyHooks = function applyHooks(applyDecorators) {
  return function (getStory, decorators) {
    var decorated = applyDecorators(hookify(getStory), decorators.map(hookify));
    return function (context) {
      currentContext = context;
      hasUpdates = false;
      var result = decorated(context);
      mountedDecorators = new Set([getStory].concat(_toConsumableArray(decorators)));
      numberOfRenders = 1;

      while (hasUpdates) {
        hasUpdates = false;
        result = decorated(context);
        numberOfRenders += 1;

        if (numberOfRenders > RENDER_LIMIT) {
          throw new Error('Too many re-renders. Storybook limits the number of renders to prevent an infinite loop.');
        }
      }

      triggerEffects();
      currentContext = null;
      return result;
    };
  };
};

exports.applyHooks = applyHooks;

var areDepsEqual = function areDepsEqual(deps, nextDeps) {
  return deps.length === nextDeps.length && deps.every(function (dep, i) {
    return dep === nextDeps[i];
  });
};

function useHook(name, callback, deps) {
  if (currentPhase === 'MOUNT') {
    if (deps != null && !Array.isArray(deps)) {
      _clientLogger.logger.warn("".concat(name, " received a final argument that is not an array (instead, received ").concat(deps, "). When specified, the final argument must be an array."));
    }

    var _hook = {
      name: name,
      deps: deps
    };
    currentHooks.push(_hook);
    callback(_hook);
    return _hook;
  }

  if (currentPhase === 'UPDATE') {
    var _hook2 = getNextHook();

    if (_hook2 == null) {
      throw new Error('Rendered more hooks than during the previous render.');
    }

    if (_hook2.name !== name) {
      _clientLogger.logger.warn("Storybook has detected a change in the order of Hooks".concat(currentDecoratorName ? " called by ".concat(currentDecoratorName) : '', ". This will lead to bugs and errors if not fixed."));
    }

    if (deps != null && _hook2.deps == null) {
      _clientLogger.logger.warn("".concat(name, " received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders."));
    }

    if (deps != null && _hook2.deps != null && deps.length !== _hook2.deps.length) {
      _clientLogger.logger.warn("The final argument passed to ".concat(name, " changed size between renders. The order and size of this array must remain constant.\nPrevious: ").concat(_hook2.deps, "\nIncoming: ").concat(deps));
    }

    if (deps == null || _hook2.deps == null || !areDepsEqual(deps, _hook2.deps)) {
      callback(_hook2);
      _hook2.deps = deps;
    }

    return _hook2;
  }

  throw new Error('Storybook preview hooks can only be called inside decorators and story functions.');
}

function useMemoLike(name, nextCreate, deps) {
  var _useHook = useHook(name, function (hook) {
    // eslint-disable-next-line no-param-reassign
    hook.memoizedState = nextCreate();
  }, deps),
      memoizedState = _useHook.memoizedState;

  return memoizedState;
}
/* Returns a memoized value, see https://reactjs.org/docs/hooks-reference.html#usememo */


function useMemo(nextCreate, deps) {
  return useMemoLike('useMemo', nextCreate, deps);
}
/* Returns a memoized callback, see https://reactjs.org/docs/hooks-reference.html#usecallback */


function useCallback(callback, deps) {
  return useMemoLike('useCallback', function () {
    return callback;
  }, deps);
}

function useRefLike(name, initialValue) {
  return useMemoLike(name, function () {
    return {
      current: initialValue
    };
  }, []);
}
/* Returns a mutable ref object, see https://reactjs.org/docs/hooks-reference.html#useref */


function useRef(initialValue) {
  return useRefLike('useRef', initialValue);
}

function triggerUpdate() {
  // Rerun getStory if updates were triggered synchronously, force rerender otherwise
  if (currentPhase !== 'NONE') {
    hasUpdates = true;
  } else {
    try {
      _addons["default"].getChannel().emit(_coreEvents.FORCE_RE_RENDER);
    } catch (e) {
      _clientLogger.logger.warn('State updates of Storybook preview hooks work only in browser');
    }
  }
}

function useStateLike(name, initialState) {
  var stateRef = useRefLike(name, // @ts-ignore S type should never be function, but there's no way to tell that to TypeScript
  typeof initialState === 'function' ? initialState() : initialState);

  var setState = function setState(update) {
    // @ts-ignore S type should never be function, but there's no way to tell that to TypeScript
    stateRef.current = typeof update === 'function' ? update(stateRef.current) : update;
    triggerUpdate();
  };

  return [stateRef.current, setState];
}
/* Returns a stateful value, and a function to update it, see https://reactjs.org/docs/hooks-reference.html#usestate */


function useState(initialState) {
  return useStateLike('useState', initialState);
}
/* A redux-like alternative to useState, see https://reactjs.org/docs/hooks-reference.html#usereducer */


function useReducer(reducer, initialArg, init) {
  var initialState = init != null ? function () {
    return init(initialArg);
  } : initialArg;

  var _useStateLike = useStateLike('useReducer', initialState),
      _useStateLike2 = _slicedToArray(_useStateLike, 2),
      state = _useStateLike2[0],
      setState = _useStateLike2[1];

  var dispatch = function dispatch(action) {
    return setState(function (prevState) {
      return reducer(prevState, action);
    });
  };

  return [state, dispatch];
}
/*
  Triggers a side effect, see https://reactjs.org/docs/hooks-reference.html#usestate
  Effects are triggered synchronously after calling the decorated story function
*/


function useEffect(create, deps) {
  var effect = useMemoLike('useEffect', function () {
    return {
      create: create
    };
  }, deps);
  currentEffects.push(effect);
}

/* Accepts a map of Storybook channel event listeners, returns an emit function */
function useChannel(eventMap) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var channel = _addons["default"].getChannel();

  useEffect(function () {
    Object.entries(eventMap).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          type = _ref2[0],
          listener = _ref2[1];

      return channel.on(type, listener);
    });
    return function () {
      Object.entries(eventMap).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            type = _ref4[0],
            listener = _ref4[1];

        return channel.removeListener(type, listener);
      });
    };
  }, [].concat(_toConsumableArray(Object.keys(eventMap)), _toConsumableArray(deps)));
  return channel.emit.bind(channel);
}
/* Returns current story context */


function useStoryContext() {
  if (currentContext == null) {
    throw new Error('Storybook preview hooks can only be called inside decorators and story functions.');
  }

  return currentContext;
}
/* Returns current value of a story parameter */


function useParameter(parameterKey, defaultValue) {
  var _useStoryContext = useStoryContext(),
      parameters = _useStoryContext.parameters;

  if (parameterKey) {
    return parameters[parameterKey] || defaultValue;
  }

  return undefined;
}