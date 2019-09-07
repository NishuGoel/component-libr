import { AddonSetting, AnyFunctionReturns, ContextNode, PropsMap } from './shared/types.d';
export declare type Render<T> = (...args: [ContextNode[], PropsMap, AnyFunctionReturns<T>]) => T;
declare type CreateAddonDecorator = <T>(render: Render<T>) => (contexts: AddonSetting[]) => unknown;
export declare const createAddonDecorator: CreateAddonDecorator;
export {};
