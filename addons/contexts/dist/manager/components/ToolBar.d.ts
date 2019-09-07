import { ComponentProps } from 'react';
import { ToolBarControl } from './ToolBarControl';
import { ContextNode, FCNoChildren, SelectionState } from '../../shared/types.d';
declare type ToolBar = FCNoChildren<{
    nodes: ContextNode[];
    state: SelectionState;
    setSelected: ComponentProps<typeof ToolBarControl>['setSelected'];
}>;
export declare const ToolBar: ToolBar;
export {};
