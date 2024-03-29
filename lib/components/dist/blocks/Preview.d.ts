import React from 'react';
import { SourceProps } from './Source';
export interface PreviewProps {
    isColumn?: boolean;
    columns?: number;
    withSource?: SourceProps;
    isExpanded?: boolean;
}
/**
 * A preview component for showing one or more component `Story`
 * items. The preview also shows the source for the componnent
 * as a drop-down.
 */
declare const Preview: React.FunctionComponent<PreviewProps>;
export { Preview };
