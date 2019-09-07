import { AnyFunctionReturns } from '../../shared/types.d';
declare type UseChannel = (event: string, eventHandler: AnyFunctionReturns<void>, input?: unknown[]) => void;
export declare const useChannel: UseChannel;
export {};
