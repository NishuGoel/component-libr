import React, { Component, WeakValidationMap } from 'react';
declare type CheckboxesTypeKnobValue = string[];
export interface CheckboxesTypeKnob {
    name: string;
    value: CheckboxesTypeKnobValue;
    defaultValue: CheckboxesTypeKnobValue;
    options: {
        [key: string]: string;
    };
}
interface CheckboxesTypeProps {
    knob: CheckboxesTypeKnob;
    isInline: boolean;
    onChange: (value: CheckboxesTypeKnobValue) => CheckboxesTypeKnobValue;
}
interface CheckboxesTypeState {
    values: CheckboxesTypeKnobValue;
}
export default class CheckboxesType extends Component<CheckboxesTypeProps, CheckboxesTypeState> {
    static defaultProps: CheckboxesTypeProps;
    static propTypes: WeakValidationMap<CheckboxesTypeProps>;
    static serialize: (value: string[]) => string[];
    static deserialize: (value: string[]) => string[];
    constructor(props: CheckboxesTypeProps);
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    renderCheckboxList: ({ options }: CheckboxesTypeKnob) => JSX.Element[];
    renderCheckbox: (label: string, value: string) => JSX.Element;
    render(): JSX.Element;
}
export {};
