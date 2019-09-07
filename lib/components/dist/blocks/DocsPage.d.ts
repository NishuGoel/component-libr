import React from 'react';
export interface DocsPageProps {
    title: string;
    subtitle?: string;
}
export declare const DocsContent: any;
export declare const DocsWrapper: any;
export declare const DocsPageWrapper: React.FunctionComponent;
/**
 * An out-of-the box documentation page for components that shows the
 * title & subtitle and a collection of blocks including `Description`,
 * and `Preview`s for each of the component's stories.
 */
declare const DocsPage: React.FunctionComponent<DocsPageProps>;
export { DocsPage };
