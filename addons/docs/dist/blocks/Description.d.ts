import React from 'react';
import { DocsContextProps } from './DocsContext';
import { Component } from './shared';
export declare enum DescriptionType {
    INFO = "info",
    NOTES = "notes",
    DOCGEN = "docgen",
    AUTO = "auto"
}
interface DescriptionProps {
    of?: '.' | Component;
    type?: DescriptionType;
    markdown?: string;
}
export declare const getDescriptionProps: ({ of, type, markdown }: DescriptionProps, { parameters }: DocsContextProps) => any;
declare const DescriptionContainer: React.FunctionComponent<DescriptionProps>;
export { DescriptionContainer as Description };
