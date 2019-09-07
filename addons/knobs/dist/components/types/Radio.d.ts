import { Component, WeakValidationMap } from 'react';
declare type RadiosTypeKnobValue = string;
export interface RadiosTypeKnob {
    name: string;
    value: RadiosTypeKnobValue;
    defaultValue: RadiosTypeKnobValue;
    options: RadiosTypeOptionsProp;
}
export interface RadiosTypeOptionsProp {
    [key: string]: RadiosTypeKnobValue;
}
interface RadiosTypeProps {
    knob: RadiosTypeKnob;
    isInline: boolean;
    onChange: (value: RadiosTypeKnobValue) => RadiosTypeKnobValue;
}
declare class RadiosType extends Component<RadiosTypeProps> {
    static defaultProps: RadiosTypeProps;
    static propTypes: WeakValidationMap<RadiosTypeProps>;
    static serialize: (value: string) => string;
    static deserialize: (value: string) => string;
    renderRadioButtonList({ options }: RadiosTypeKnob): JSX.Element[];
    renderRadioButton(label: string, value: RadiosTypeKnobValue): JSX.Element;
    render(): JSX.Element;
}
export default RadiosType;
