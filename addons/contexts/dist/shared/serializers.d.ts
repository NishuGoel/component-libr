import { SelectionState } from './types.d';
declare type deserialize = (param?: string) => SelectionState | null;
export declare const deserialize: deserialize;
declare type serialize = (state: ReturnType<deserialize>) => string | null;
export declare const serialize: serialize;
export {};
