import React, { Component } from 'react';
import PropTypes from 'prop-types';
export interface ObjectTypeKnob<T> {
    name: string;
    value: T;
}
interface ObjectTypeProps<T> {
    knob: ObjectTypeKnob<T>;
    onChange: (value: T) => T;
}
interface ObjectTypeState<T> {
    value: string;
    failed: boolean;
    json?: T;
}
declare class ObjectType<T> extends Component<ObjectTypeProps<T>> {
    static propTypes: {
        knob: PropTypes.Validator<PropTypes.InferProps<{
            name: PropTypes.Requireable<string>;
            value: PropTypes.Requireable<object>;
        }>>;
        onChange: PropTypes.Validator<(...args: any[]) => any>;
    };
    static serialize: {
        <T>(object: T): string;
    };
    static deserialize: {
        <T>(value: string): T;
    };
    static getDerivedStateFromProps<T>(props: ObjectTypeProps<T>, state: ObjectTypeState<T>): ObjectTypeState<T>;
    state: ObjectTypeState<T>;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    render(): JSX.Element;
}
export default ObjectType;
