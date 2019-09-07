import { Component } from 'react';
import { Result } from 'axe-core';
import { RuleType } from '../A11YPanel';
interface ItemProps {
    item: Result;
    type: RuleType;
}
interface ItemState {
    open: boolean;
}
export declare class Item extends Component<ItemProps, ItemState> {
    state: {
        open: boolean;
    };
    onToggle: () => void;
    render(): JSX.Element;
}
export {};
