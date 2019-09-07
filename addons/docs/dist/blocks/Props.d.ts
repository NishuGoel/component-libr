import React from 'react';
import { DocsContextProps } from './DocsContext';
import { Component } from './shared';
interface PropsProps {
    exclude?: string[];
    of: '.' | Component;
}
export declare const getPropsTableProps: ({ exclude, of }: PropsProps, { parameters }: DocsContextProps) => any;
declare const PropsContainer: React.FunctionComponent<PropsProps>;
export { PropsContainer as Props };
