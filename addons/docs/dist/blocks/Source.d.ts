import React from 'react';
import { DocsContextProps } from './DocsContext';
interface CommonProps {
    language?: string;
}
declare type SingleSourceProps = {
    id: string;
} & CommonProps;
declare type MultiSourceProps = {
    ids: string[];
} & CommonProps;
declare type CodeProps = {
    code: string;
} & CommonProps;
declare type NoneProps = CommonProps;
declare type SourceProps = SingleSourceProps | MultiSourceProps | CodeProps | NoneProps;
export declare const getSourceProps: (props: SourceProps, { id: currentId, storyStore }: DocsContextProps) => any;
/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */
declare const SourceContainer: React.FunctionComponent<SourceProps>;
export { SourceContainer as Source };
