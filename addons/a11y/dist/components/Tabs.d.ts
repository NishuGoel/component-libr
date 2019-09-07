import React, { Component } from 'react';
import { Result } from 'axe-core';
import { RuleType } from './A11YPanel';
interface TabsProps {
    tabs: {
        label: JSX.Element;
        panel: JSX.Element;
        items: Result[];
        type: RuleType;
    }[];
}
interface TabsState {
    active: number;
}
export declare class Tabs extends Component<TabsProps, TabsState> {
    state: TabsState;
    onToggle: (event: React.SyntheticEvent<Element, Event>) => void;
    render(): JSX.Element;
}
export {};
