import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { KnobStoreKnob } from '../KnobStore';
export declare const DEFAULT_GROUP_ID = "Other";
interface KnobPanelProps {
    active: boolean;
    onReset?: object;
    api: {
        on: Function;
        off: Function;
        emit: Function;
        getQueryParam: Function;
        setQueryParams: Function;
    };
}
interface KnobPanelState {
    knobs: Record<string, KnobStoreKnob>;
}
interface KnobPanelOptions {
    timestamps?: boolean;
}
export default class KnobPanel extends PureComponent<KnobPanelProps> {
    static propTypes: {
        active: PropTypes.Validator<boolean>;
        onReset: PropTypes.Requireable<object>;
        api: PropTypes.Validator<PropTypes.InferProps<{
            on: PropTypes.Requireable<(...args: any[]) => any>;
            getQueryParam: PropTypes.Requireable<(...args: any[]) => any>;
            setQueryParams: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
    };
    state: KnobPanelState;
    options: KnobPanelOptions;
    lastEdit: number;
    loadedFromUrl: boolean;
    mounted: boolean;
    stopListeningOnStory: Function;
    componentDidMount(): void;
    componentWillUnmount(): void;
    setOptions: (options?: KnobPanelOptions) => void;
    setKnobs: ({ knobs, timestamp, }: {
        knobs: Record<string, KnobStoreKnob>;
        timestamp?: number;
    }) => void;
    reset: () => void;
    copy: () => void;
    emitChange: (changedKnob: KnobStoreKnob) => void;
    handleChange: (changedKnob: KnobStoreKnob) => void;
    handleClick: (knob: KnobStoreKnob) => void;
    render(): JSX.Element;
}
export {};
