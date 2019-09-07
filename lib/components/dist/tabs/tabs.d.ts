import React, { Component, FunctionComponent, ReactNode } from 'react';
import PropTypes from 'prop-types';
export interface WrapperProps {
    bordered?: boolean;
    absolute?: boolean;
}
export declare const TabBar: any;
export interface ContentProps {
    absolute?: boolean;
}
export interface VisuallyHiddenProps {
    active?: boolean;
}
export interface TabWrapperProps {
    active: boolean;
    render?: () => JSX.Element;
    children?: ReactNode;
}
export declare const TabWrapper: FunctionComponent<TabWrapperProps>;
export declare const panelProps: {
    active: PropTypes.Requireable<boolean>;
};
export interface TabsProps {
    id?: string;
    children?: ReactNode;
    tools?: ReactNode;
    selected?: string;
    actions?: {
        onSelect: (id: string) => void;
    };
    absolute?: boolean;
    bordered?: boolean;
}
export declare const Tabs: React.NamedExoticComponent<TabsProps>;
declare type FuncChilden = () => void;
export interface TabsStateProps {
    children: (ReactNode | FuncChilden)[];
    initial: string;
    absolute: boolean;
    bordered: boolean;
}
export interface TabsStateState {
    selected: string;
}
export declare class TabsState extends Component<TabsStateProps, TabsStateState> {
    static defaultProps: TabsStateProps;
    constructor(props: TabsStateProps);
    render(): JSX.Element;
}
export {};
