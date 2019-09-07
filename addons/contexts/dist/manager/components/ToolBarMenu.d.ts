import { ComponentProps } from 'react';
import { Icons } from '@storybook/components';
import { ToolBarMenuOptions } from './ToolBarMenuOptions';
import { ContextNode, FCNoChildren } from '../../shared/types.d';
declare type ToolBarMenu = FCNoChildren<{
    icon?: ComponentProps<typeof Icons>['icon'] | '' | void;
    title: ContextNode['title'];
    active: boolean;
    expanded: boolean;
    setExpanded: (state: boolean) => void;
    optionsProps: ComponentProps<typeof ToolBarMenuOptions>;
}>;
export declare const ToolBarMenu: ToolBarMenu;
export {};
