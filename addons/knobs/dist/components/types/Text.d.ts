import React, { Component, WeakValidationMap } from 'react';
declare type TextTypeKnobValue = string;
export interface TextTypeKnob {
    name: string;
    value: TextTypeKnobValue;
}
interface TextTypeProps {
    knob: TextTypeKnob;
    onChange: (value: TextTypeKnobValue) => TextTypeKnobValue;
}
export default class TextType extends Component<TextTypeProps> {
    static defaultProps: TextTypeProps;
    static propTypes: WeakValidationMap<TextTypeProps>;
    static serialize: (value: string) => string;
    static deserialize: (value: string) => string;
    shouldComponentUpdate(nextProps: TextTypeProps): boolean;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export {};
