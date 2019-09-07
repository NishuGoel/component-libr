import React, { FunctionComponent } from 'react';
export declare type SelectTypeKnobValue = string | number | null | undefined;
export interface SelectTypeKnob {
    name: string;
    value: SelectTypeKnobValue;
    options: SelectTypeOptionsProp;
}
export declare type SelectTypeOptionsProp = Record<string, SelectTypeKnobValue> | NonNullable<SelectTypeKnobValue>[];
export interface SelectTypeProps {
    knob: SelectTypeKnob;
    onChange: (value: SelectTypeKnobValue) => SelectTypeKnobValue;
}
declare const serialize: (value: React.ReactText) => React.ReactText;
declare const deserialize: (value: React.ReactText) => React.ReactText;
declare const SelectType: FunctionComponent<SelectTypeProps> & {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};
export default SelectType;
