import { Component, WeakValidationMap } from 'react';
import { KnobStoreKnob } from '../KnobStore';
interface PropFormProps {
    knobs: KnobStoreKnob[];
    onFieldChange: Function;
    onFieldClick: Function;
}
export default class PropForm extends Component<PropFormProps> {
    static displayName: string;
    static defaultProps: {
        knobs: KnobStoreKnob[];
    };
    static propTypes: WeakValidationMap<PropFormProps>;
    makeChangeHandler(name: string, type: string): (value?: string) => void;
    render(): JSX.Element;
}
export {};
