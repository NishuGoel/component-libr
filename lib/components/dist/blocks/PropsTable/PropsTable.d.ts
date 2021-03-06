import React from 'react';
import { PropDef } from './PropDef';
export declare const Table: any;
export declare enum PropsTableError {
    NO_COMPONENT = "No component found",
    PROPS_UNSUPPORTED = "Props unsupported. See Props documentation for your framework."
}
export interface PropsTableRowsProps {
    rows: PropDef[];
}
export interface PropsTableErrorProps {
    error: PropsTableError;
}
export declare type PropsTableProps = PropsTableRowsProps | PropsTableErrorProps;
/**
 * Display the props for a component as a props table. Each row is a collection of
 * PropDefs, usually derived from docgen info for the component.
 */
declare const PropsTable: React.FunctionComponent<PropsTableProps>;
export { PropsTable, PropDef };
