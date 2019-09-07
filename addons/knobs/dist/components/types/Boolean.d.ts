import { FunctionComponent } from 'react';
declare type BooleanTypeKnobValue = boolean;
export interface BooleanTypeKnob {
    name: string;
    value: BooleanTypeKnobValue;
    separator: string;
}
export interface BooleanTypeProps {
    knob: BooleanTypeKnob;
    onChange: (value: BooleanTypeKnobValue) => BooleanTypeKnobValue;
}
declare const serialize: (value: boolean) => string;
declare const deserialize: (value: string) => boolean;
declare const BooleanType: FunctionComponent<BooleanTypeProps> & {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};
export default BooleanType;
