import React, { Component, WeakValidationMap } from 'react';
declare type DateTypeKnobValue = number;
export interface DateTypeKnob {
    name: string;
    value: DateTypeKnobValue;
}
interface DateTypeProps {
    knob: DateTypeKnob;
    onChange: (value: DateTypeKnobValue) => DateTypeKnobValue;
}
interface DateTypeState {
    valid: boolean | undefined;
}
export default class DateType extends Component<DateTypeProps, DateTypeState> {
    static defaultProps: DateTypeProps;
    static propTypes: WeakValidationMap<DateTypeProps>;
    static serialize: (value: number) => number;
    static deserialize: (value: number) => number;
    static getDerivedStateFromProps(): {
        valid: boolean;
    };
    state: DateTypeState;
    dateInput: HTMLInputElement;
    timeInput: HTMLInputElement;
    componentDidUpdate(): void;
    onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTimeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    render(): JSX.Element;
}
export {};
