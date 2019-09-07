import { FORCE_RE_RENDER } from '@storybook/addon-contexts/src/shared/constants';
import { defaultDecorateStory } from './client_api';
import {
  applyHooks,
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
  useReducer,
  useChannel,
  useParameter,
  useStoryContext,
} from './hooks';

jest.mock('@storybook/client-logger', () => ({
  logger: { warn: jest.fn(), log: jest.fn() },
}));

let mockChannel;
beforeEach(() => {
  mockChannel = {
    emit: jest.fn(),
    on: jest.fn(),
    removeListener: jest.fn(),
  };
});

jest.mock('@storybook/addons', () => ({
  getChannel: () => mockChannel,
}));

const decorateStory = applyHooks(defaultDecorateStory);

const run = (storyFn, decorators = [], context) => decorateStory(storyFn, decorators)(context);

describe('Preview hooks', () => {
  describe('useEffect', () => {
    it('triggers the effect from story function', () => {
      const effect = jest.fn();
      run(() => {
        useEffect(effect);
      });
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('triggers the effect from decorator', () => {
      const effect = jest.fn();
      run(() => {}, [
        storyFn => {
          useEffect(effect);
          return storyFn();
        },
      ]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('triggers the effect from decorator if story call comes before useEffect', () => {
      const effect = jest.fn();
      run(() => {}, [
        storyFn => {
          const story = storyFn();
          useEffect(effect);
          return story;
        },
      ]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('retriggers the effect if no deps array is provided', () => {
      const effect = jest.fn();
      const storyFn = () => {
        useEffect(effect);
      };
      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(2);
    });
    it("doesn't retrigger the effect if empty deps array is provided", () => {
      const effect = jest.fn();
      const storyFn = () => {
        useEffect(effect, []);
      };
      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it("doesn't retrigger the effect from decorator if story has changed", () => {
      const effect = jest.fn();
      const decorator = storyFn => {
        useEffect(effect, []);
        return storyFn();
      };
      run(() => {}, [decorator]);
      run(() => {}, [decorator]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it("doesn't retrigger the effect from decorator if story has changed and story call comes before useEffect", () => {
      const effect = jest.fn();
      const decorator = storyFn => {
        const story = storyFn();
        useEffect(effect, []);
        return story;
      };
      run(() => {}, [decorator]);
      run(() => {}, [decorator]);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('retriggers the effect if some of the deps are changed', () => {
      const effect = jest.fn();
      let counter = 0;
      const storyFn = () => {
        useEffect(effect, [counter]);
        counter += 1;
      };
      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(2);
    });
    it("doesn't retrigger the effect if none of the deps are changed", () => {
      const effect = jest.fn();
      const storyFn = () => {
        useEffect(effect, [0]);
      };
      run(storyFn);
      run(storyFn);
      expect(effect).toHaveBeenCalledTimes(1);
    });
    it('performs cleanup when retriggering', () => {
      const destroy = jest.fn();
      const storyFn = () => {
        useEffect(() => destroy);
      };
      run(storyFn);
      run(storyFn);
      expect(destroy).toHaveBeenCalledTimes(1);
    });
    it("doesn't perform cleanup when keeping the current effect", () => {
      const destroy = jest.fn();
      const storyFn = () => {
        useEffect(() => destroy, []);
      };
      run(storyFn);
      run(storyFn);
      expect(destroy).not.toHaveBeenCalled();
    });
    it('performs cleanup when removing the decorator', () => {
      const destroy = jest.fn();
      run(() => {}, [
        storyFn => {
          useEffect(() => destroy);
          return storyFn();
        },
      ]);
      run(() => {});
      expect(destroy).toHaveBeenCalledTimes(1);
    });
  });
  describe('useChannel', () => {
    it('calls .on when rendering the decorator', () => {
      const handler = () => {};
      run(() => {}, [
        storyFn => {
          useChannel({
            SOME_EVENT: handler,
          });
          return storyFn();
        },
      ]);
      expect(mockChannel.on).toHaveBeenCalledTimes(1);
      expect(mockChannel.removeListener).toHaveBeenCalledTimes(0);
    });
    it('calls .removeListener when removing the decorator', () => {
      const handler = () => {};
      run(() => {}, [
        storyFn => {
          useChannel({
            SOME_EVENT: handler,
          });
          return storyFn();
        },
      ]);
      expect(mockChannel.on).toHaveBeenCalledTimes(1);
      expect(mockChannel.removeListener).toHaveBeenCalledTimes(0);
      run(() => {});
      expect(mockChannel.removeListener).toHaveBeenCalledTimes(1);
    });
  });
  describe('useStoryContext', () => {
    it('returns current context', () => {
      const context = {};
      run(
        () => {
          expect(useStoryContext()).toBe(context);
        },
        [],
        context
      );
    });
  });
  describe('useParameter', () => {
    it('will pull value from storyStore', () => {
      run(
        () => {},
        [
          storyFn => {
            expect(useParameter('foo', 4)).toEqual(42);
            return storyFn();
          },
        ],
        { parameters: { foo: 42 } }
      );
    });
    it('will return default value', () => {
      run(
        () => {},
        [
          storyFn => {
            expect(useParameter('bar', 4)).toEqual(4);
            return storyFn();
          },
        ],
        { parameters: {} }
      );
    });
    it('will return undefined when no value is found', () => {
      run(
        () => {},
        [
          storyFn => {
            expect(useParameter('bar')).toBe(undefined);
            return storyFn();
          },
        ],
        { parameters: {} }
      );
    });
  });
  describe('useMemo', () => {
    it('performs the calculation', () => {
      let result;
      const nextCreate = jest.fn(() => 'foo');
      const storyFn = () => {
        result = useMemo(nextCreate, []);
      };
      run(storyFn);
      expect(nextCreate).toHaveBeenCalledTimes(1);
      expect(result).toBe('foo');
    });
    it('performs the calculation once if deps are unchanged', () => {
      let result;
      const nextCreate = jest.fn(() => 'foo');
      const storyFn = () => {
        result = useMemo(nextCreate, []);
      };
      run(storyFn);
      run(storyFn);
      expect(nextCreate).toHaveBeenCalledTimes(1);
      expect(result).toBe('foo');
    });
    it('performs the calculation again if deps are changed', () => {
      let result;
      let counter = 0;
      const nextCreate = jest.fn(() => counter);
      const storyFn = () => {
        counter += 1;
        result = useMemo(nextCreate, [counter]);
      };
      run(storyFn);
      run(storyFn);
      expect(nextCreate).toHaveBeenCalledTimes(2);
      expect(result).toBe(counter);
    });
  });
  describe('useCallback', () => {
    it('returns the callback', () => {
      let result;
      const callback = () => {};
      const storyFn = () => {
        result = useCallback(callback, []);
      };
      run(storyFn);
      expect(result).toBe(callback);
    });
    it('returns the previous callback reference if deps are unchanged', () => {
      const callbacks = [];
      const storyFn = () => {
        const callback = useCallback(() => {}, []);
        callbacks.push(callback);
      };
      run(storyFn);
      run(storyFn);
      expect(callbacks[0]).toBe(callbacks[1]);
    });
    it('creates new callback reference if deps are changed', () => {
      const callbacks = [];
      let counter = 0;
      const storyFn = () => {
        counter += 1;
        const callback = useCallback(() => {}, [counter]);
        callbacks.push(callback);
      };
      run(storyFn);
      run(storyFn);
      expect(callbacks[0]).not.toBe(callbacks[1]);
    });
  });
  describe('useRef', () => {
    it('attaches initial value', () => {
      let ref;
      const storyFn = () => {
        ref = useRef('foo');
      };
      run(storyFn);
      expect(ref.current).toBe('foo');
    });
    it('stores mutations', () => {
      let refValueFromSecondRender;
      let counter = 0;
      const storyFn = () => {
        counter += 1;
        const ref = useRef('foo');

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
  describe('useState', () => {
    it('sets initial state', () => {
      let state;
      const storyFn = () => {
        [state] = useState('foo');
      };
      run(storyFn);
      expect(state).toBe('foo');
    });
    it('calculates initial state', () => {
      let state;
      const storyFn = () => {
        [state] = useState(() => 'foo');
      };
      run(storyFn);
      expect(state).toBe('foo');
    });
    it('performs synchronous state updates', () => {
      let state;
      let setState;
      const storyFn = jest.fn(() => {
        [state, setState] = useState('foo');
        if (state === 'foo') {
          setState('bar');
        }
      });
      run(storyFn);
      expect(storyFn).toHaveBeenCalledTimes(2);
      expect(state).toBe('bar');
    });
    it('performs synchronous state updates with updater function', () => {
      let state;
      let setState;
      const storyFn = jest.fn(() => {
        [state, setState] = useState(0);
        if (state < 3) {
          setState(prevState => prevState + 1);
        }
      });
      run(storyFn);
      expect(storyFn).toHaveBeenCalledTimes(4);
      expect(state).toBe(3);
    });
    it('performs asynchronous state updates', () => {
      let state;
      let setState;
      const storyFn = jest.fn(() => {
        [state, setState] = useState('foo');
      });
      run(storyFn);
      setState('bar');
      expect(mockChannel.emit).toHaveBeenCalledWith(FORCE_RE_RENDER);
      run(storyFn);
      expect(state).toBe('bar');
    });
  });
  describe('useReducer', () => {
    it('sets initial state', () => {
      let state;
      const storyFn = () => {
        [state] = useReducer(() => 'bar', 'foo');
      };
      run(storyFn);
      expect(state).toBe('foo');
    });
    it('calculates initial state', () => {
      let state;
      const storyFn = () => {
        [state] = useReducer(() => 'bar', 'foo', arg => arg);
      };
      run(storyFn);
      expect(state).toBe('foo');
    });
    it('performs synchronous state updates', () => {
      let state;
      let dispatch;
      const storyFn = jest.fn(() => {
        [state, dispatch] = useReducer((prevState, action) => {
          switch (action) {
            case 'INCREMENT':
              return prevState + 1;
            default:
              return prevState;
          }
        }, 0);
        if (state < 3) {
          dispatch('INCREMENT');
        }
      });
      run(storyFn);
      expect(storyFn).toHaveBeenCalledTimes(4);
      expect(state).toBe(3);
    });
    it('performs asynchronous state updates', () => {
      let state;
      let dispatch;
      const storyFn = jest.fn(() => {
        [state, dispatch] = useReducer((prevState, action) => {
          switch (action) {
            case 'INCREMENT':
              return prevState + 1;
            default:
              return prevState;
          }
        }, 0);
      });
      run(storyFn);
      dispatch('INCREMENT');
      expect(mockChannel.emit).toHaveBeenCalledWith(FORCE_RE_RENDER);
      run(storyFn);
      expect(state).toBe(1);
    });
  });
});
