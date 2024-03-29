import React from 'react';
export declare enum StoryError {
    NO_STORY = "No component or story to display"
}
interface CommonProps {
    title: string;
    height?: string;
}
declare type InlineStoryProps = {
    storyFn: () => React.ElementType;
} & CommonProps;
declare type IFrameStoryProps = {
    id: string;
} & CommonProps;
declare type ErrorProps = {
    error?: StoryError;
} & CommonProps;
export declare type StoryProps = (InlineStoryProps | IFrameStoryProps | ErrorProps) & {
    inline: boolean;
};
/**
 * A story element, either renderend inline or in an iframe,
 * with configurable height.
 */
declare const Story: React.FunctionComponent<StoryProps>;
export { Story };
