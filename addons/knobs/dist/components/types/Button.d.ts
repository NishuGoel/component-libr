import { FunctionComponent } from 'react';
export interface ButtonTypeKnob {
    name: string;
    value: unknown;
}
export declare type ButtonTypeOnClickProp = (knob: ButtonTypeKnob) => any;
export interface ButtonTypeProps {
    knob: ButtonTypeKnob;
    onClick: ButtonTypeOnClickProp;
}
declare const serialize: () => undefined;
declare const deserialize: () => undefined;
declare const ButtonType: FunctionComponent<ButtonTypeProps> & {
    serialize: typeof serialize;
    deserialize: typeof deserialize;
};
export default ButtonType;
