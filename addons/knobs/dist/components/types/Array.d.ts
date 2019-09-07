import React, { Component, WeakValidationMap } from 'react';
declare type ArrayTypeKnobValue = string[];
export interface ArrayTypeKnob {
    name: string;
    value: ArrayTypeKnobValue;
    separator: string;
}
interface ArrayTypeProps {
    knob: ArrayTypeKnob;
    onChange: (value: ArrayTypeKnobValue) => ArrayTypeKnobValue;
}
export default class ArrayType extends Component<ArrayTypeProps> {
    static defaultProps: Partial<ArrayTypeProps>;
    static propTypes: WeakValidationMap<ArrayTypeProps>;
    static serialize: (value: string[]) => string[];
    static deserialize: (value: string[]) => any[];
    shouldComponentUpdate(nextProps: Readonly<ArrayTypeProps>): boolean;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export {};
