import { FunctionComponent } from 'react';
export declare type OptionsKnobOptionsDisplay = 'radio' | 'inline-radio' | 'check' | 'inline-check' | 'select' | 'multi-select';
export interface OptionsKnobOptions {
    display?: OptionsKnobOptionsDisplay;
}
export interface OptionsTypeKnob<T> {
    name: string;
    value: T;
    defaultValue: T;
    options: OptionsTypeOptionsProp<T>;
    optionsObj: OptionsKnobOptions;
}
export interface OptionsTypeOptionsProp<T> {
    [key: string]: T;
}
export interface OptionsTypeProps<T> {
    knob: OptionsTypeKnob<T>;
    display: OptionsKnobOptionsDisplay;
    onChange: (value: T) => T;
}
declare const serialize: {
    <T>(value: T): T;
};
declare const deserialize: {
    <T>(value: T): T;
};
declare const OptionsType: FunctionComponent<OptionsTypeProps<any>> & {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};
export default OptionsType;
