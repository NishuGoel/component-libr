import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OnEmitEvent } from '../index';
interface ItemProps {
    name: string;
    title: string;
    onEmit: (event: OnEmitEvent) => void;
    payload: unknown;
}
interface ItemState {
    isTextAreaShowed: boolean;
    failed: boolean;
    payload: unknown;
    payloadString: string;
    prevPayload: unknown;
}
declare class Item extends Component<ItemProps, ItemState> {
    static propTypes: {
        name: PropTypes.Validator<string>;
        title: PropTypes.Validator<string>;
        onEmit: PropTypes.Validator<(...args: any[]) => any>;
        payload: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        payload: {};
    };
    state: ItemState;
    onChange: ({ target: { value } }: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEmitClick: () => void;
    onToggleEditClick: () => void;
    static getDerivedStateFromProps: ({ payload }: ItemProps, { prevPayload }: ItemState) => {
        failed: boolean;
        payload: any;
        payloadString: any;
        prevPayload: any;
    };
    render(): JSX.Element;
}
export default Item;
