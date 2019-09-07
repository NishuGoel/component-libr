import { Component } from 'react';
import { API } from '@storybook/api';
import { CssResource } from './CssResource';
interface Props {
    active: boolean;
    api: API;
}
interface State {
    currentStoryId: string;
    list: CssResource[];
}
export declare class CssResourcePanel extends Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    onStoryChange: (id: string) => void;
    onChange: (event: any) => void;
    emit(list: CssResource[]): void;
    render(): JSX.Element;
}
export {};
