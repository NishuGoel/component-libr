import { Component } from 'react';
import { ActionDisplay } from '@storybook/addon-actions';
interface ActionLoggerProps {
    active: boolean;
}
interface ActionLoggerState {
    actions: ActionDisplay[];
}
export default class ActionLogger extends Component<ActionLoggerProps, ActionLoggerState> {
    private channel;
    constructor(props: ActionLoggerProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    handleStoryChange: () => void;
    addAction: (action: any) => void;
    clearActions: () => void;
    render(): JSX.Element;
}
export {};
