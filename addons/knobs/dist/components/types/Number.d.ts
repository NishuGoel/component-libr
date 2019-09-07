import PropTypes from 'prop-types';
import React, { Component } from 'react';
declare type NumberTypeKnobValue = number;
export interface NumberTypeKnobOptions {
    range?: boolean;
    min?: number;
    max?: number;
    step?: number;
}
export interface NumberTypeKnob extends NumberTypeKnobOptions {
    name: string;
    value: number;
}
interface NumberTypeProps {
    knob: NumberTypeKnob;
    onChange: (value: NumberTypeKnobValue) => NumberTypeKnobValue;
}
export default class NumberType extends Component<NumberTypeProps> {
    static propTypes: {
        knob: PropTypes.Validator<PropTypes.InferProps<{
            name: PropTypes.Requireable<string>;
            value: PropTypes.Requireable<React.ReactText>;
            range: PropTypes.Requireable<boolean>;
            min: PropTypes.Requireable<number>;
            max: PropTypes.Requireable<number>;
            step: PropTypes.Requireable<number>;
        }>>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    static serialize: (value: number) => string;
    static deserialize: (value: string) => number;
    shouldComponentUpdate(nextProps: NumberTypeProps): boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
