import React, { FunctionComponent } from 'react';
export declare const ActionButton: any;
export interface ActionItem {
    title: string | JSX.Element;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export interface ActionBarProps {
    actionItems: ActionItem[];
}
export declare const ActionBar: FunctionComponent<ActionBarProps>;
