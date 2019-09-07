declare type memorize = <T, U extends any[]>(fn: (...args: U) => T, resolver?: (...args: U) => unknown) => (...args: U) => T;
export declare const memorize: memorize;
declare type singleton = <T, U extends any[]>(fn: (...args: U) => T) => (...args: U) => T;
export declare const singleton: singleton;
export {};
