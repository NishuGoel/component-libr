import { Component } from 'react';
import { Result } from 'axe-core';
import { API } from '@storybook/api';
export declare enum RuleType {
    VIOLATION = 0,
    PASS = 1,
    INCOMPLETION = 2
}
interface A11YPanelState {
    status: string;
    passes: Result[];
    violations: Result[];
    incomplete: Result[];
}
interface A11YPanelProps {
    active: boolean;
    api: API;
}
export declare class A11YPanel extends Component<A11YPanelProps, A11YPanelState> {
    state: A11YPanelState;
    componentDidMount(): void;
    componentDidUpdate(prevProps: A11YPanelProps): void;
    componentWillUnmount(): void;
    onUpdate: ({ passes, violations, incomplete }: any) => void;
    request: () => void;
    render(): JSX.Element;
}
export {};
