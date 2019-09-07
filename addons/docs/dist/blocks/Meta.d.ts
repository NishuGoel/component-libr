import React from 'react';
declare type Decorator = (...args: any) => any;
interface MetaProps {
    title: string;
    decorators?: [Decorator];
    parameters?: any;
}
/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 * It doesn't actually render anything.
 */
export declare const Meta: React.FunctionComponent<MetaProps>;
export {};
