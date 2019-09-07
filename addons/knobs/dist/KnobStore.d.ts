import { Knob } from './type-defs';
declare type Callback = () => any;
export declare type KnobStoreKnob = Knob & {
    name: string;
    label: string;
    used?: boolean;
    defaultValue?: any;
    hideLabel?: boolean;
    callback?: () => any;
};
export default class KnobStore {
    store: Record<string, KnobStoreKnob>;
    callbacks: Callback[];
    timer: NodeJS.Timeout;
    has(key: string): boolean;
    set(key: string, value: KnobStoreKnob): void;
    get(key: string): KnobStoreKnob;
    getAll(): Record<string, KnobStoreKnob>;
    reset(): void;
    markAllUnused(): void;
    subscribe(cb: Callback): void;
    unsubscribe(cb: Callback): void;
}
export {};
