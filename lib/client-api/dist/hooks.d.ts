import { StoryGetter, StoryContext } from '@storybook/addons';
declare type Decorator = (getStory: StoryGetter, context: StoryContext) => any;
export declare const applyHooks: (applyDecorators: (getStory: any, decorators: Decorator[]) => any) => (getStory: any, decorators: Decorator[]) => (context: any) => any;
export declare function useMemo<T>(nextCreate: () => T, deps?: any[]): T;
export declare function useCallback<T>(callback: T, deps?: any[]): T;
export declare function useRef<T>(initialValue: T): {
    current: T;
};
export declare function useState<S>(initialState: (() => S) | S): [S, (update: ((prevState: S) => S) | S) => void];
export declare function useReducer<S, A>(reducer: (state: S, action: A) => S, initialState: S): [S, (action: A) => void];
export declare function useReducer<S, I, A>(reducer: (state: S, action: A) => S, initialArg: I, init: (initialArg: I) => S): [S, (action: A) => void];
export declare function useEffect(create: () => (() => void) | void, deps?: any[]): void;
export interface Listener {
    (...args: any[]): void;
    ignorePeer?: boolean;
}
export interface EventMap {
    [eventId: string]: Listener;
}
export declare function useChannel(eventMap: EventMap, deps?: any[]): any;
export declare function useStoryContext(): StoryContext;
export declare function useParameter<S>(parameterKey: string, defaultValue?: S): S | undefined;
export {};
