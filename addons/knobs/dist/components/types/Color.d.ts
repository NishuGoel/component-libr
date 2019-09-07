import { Component, WeakValidationMap } from 'react';
declare type ColorTypeKnobValue = string;
export interface ColorTypeKnob {
    name: string;
    value: ColorTypeKnobValue;
}
interface ColorTypeProps {
    knob: ColorTypeKnob;
    onChange: (value: ColorTypeKnobValue) => ColorTypeKnobValue;
}
interface ColorTypeState {
    displayColorPicker: boolean;
}
export default class ColorType extends Component<ColorTypeProps, ColorTypeState> {
    static propTypes: WeakValidationMap<ColorTypeProps>;
    static defaultProps: ColorTypeProps;
    static serialize: (value: string) => string;
    static deserialize: (value: string) => string;
    state: ColorTypeState;
    popover: HTMLDivElement;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: ColorTypeProps, nextState: ColorTypeState): boolean;
    componentWillUnmount(): void;
    handleWindowMouseDown: (e: MouseEvent) => void;
    handleClick: () => void;
    handleChange: (color: any) => void;
    render(): JSX.Element;
}
export {};
