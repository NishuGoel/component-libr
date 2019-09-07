import { ContextNode, FCNoChildren, Omit } from '../../shared/types.d';
declare type ToolBarControl = FCNoChildren<Omit<ContextNode & {
    selected: string;
    setSelected: (nodeId: string, name: string) => void;
}, 'components'>>;
export declare const ToolBarControl: ToolBarControl;
export {};
