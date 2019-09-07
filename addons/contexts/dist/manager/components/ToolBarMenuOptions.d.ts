import { FCNoChildren } from '../../shared/types.d';
declare type ToolBarMenuOptions = FCNoChildren<{
    activeName: string;
    list: string[];
    onSelectOption: (name: string) => () => void;
}>;
export declare const ToolBarMenuOptions: ToolBarMenuOptions;
export {};
