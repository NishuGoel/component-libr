import React from 'react';
import { PreviewProps as PurePreviewProps } from '@storybook/components';
export declare enum SourceState {
    OPEN = "open",
    CLOSED = "closed",
    NONE = "none"
}
declare type PreviewProps = PurePreviewProps & {
    withSource?: SourceState;
};
export declare const Preview: React.FunctionComponent<PreviewProps>;
export {};
