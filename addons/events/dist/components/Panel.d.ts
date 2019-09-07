import { Component } from 'react';
import PropTypes from 'prop-types';
import { API } from '@storybook/api';
import { Event as EventType, OnEmitEvent } from '../index';
interface EventsPanelProps {
    active: boolean;
    api: API;
}
interface EventsPanelState {
    events: EventType[];
}
export default class EventsPanel extends Component<EventsPanelProps, EventsPanelState> {
    static propTypes: {
        active: PropTypes.Validator<boolean>;
        api: PropTypes.Validator<PropTypes.InferProps<{
            emit: PropTypes.Requireable<(...args: any[]) => any>;
            off: PropTypes.Requireable<(...args: any[]) => any>;
            on: PropTypes.Requireable<(...args: any[]) => any>;
        }>>;
    };
    state: EventsPanelState;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onAdd: (events: EventType[]) => void;
    onEmit: (event: OnEmitEvent) => void;
    render(): JSX.Element;
}
export {};
