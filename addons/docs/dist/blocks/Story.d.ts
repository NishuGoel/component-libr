import React from 'react';
import { DocsContextProps } from './DocsContext';
interface CommonProps {
    height?: string;
    inline?: boolean;
}
declare type StoryDefProps = {
    name: string;
    children: React.ReactNode;
} & CommonProps;
declare type StoryRefProps = {
    id?: string;
} & CommonProps;
export declare type StoryProps = StoryDefProps | StoryRefProps;
export declare const getStoryProps: (props: StoryProps, { id: currentId, storyStore, parameters, mdxKind }: DocsContextProps) => any;
declare const StoryContainer: React.FunctionComponent<StoryProps>;
export { StoryContainer as Story };
