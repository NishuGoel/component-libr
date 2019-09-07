import React from 'react';
export declare const isValidFiberElement: (element: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>) => boolean;
export declare const isPriorToFiber: (version: string) => boolean;
declare const isReactRenderable: (element: React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>) => boolean;
export default isReactRenderable;
