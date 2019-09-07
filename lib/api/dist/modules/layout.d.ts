import { ThemeVars } from '@storybook/theming';
import Store from '../store';
export declare type PanelPositions = 'bottom' | 'right';
export interface Layout {
    isFullscreen: boolean;
    showPanel: boolean;
    panelPosition: PanelPositions;
    showNav: boolean;
    isToolshown: boolean;
}
export interface UI {
    name?: string;
    url?: string;
    enableShortcuts: boolean;
    sidebarAnimations: boolean;
    docsMode: boolean;
}
export interface SubState {
    layout: Layout;
    ui: UI;
    selectedPanel: string | undefined;
    theme: ThemeVars;
}
export interface SubAPI {
    toggleFullscreen: (toggled?: boolean) => void;
    togglePanel: (toggled?: boolean) => void;
    togglePanelPosition: (position?: PanelPositions) => void;
    toggleNav: (toggled?: boolean) => void;
    toggleToolbar: (toggled?: boolean) => void;
    setOptions: (options: any) => void;
}
export declare const focusableUIElements: {
    storySearchField: string;
    storyListMenu: string;
    storyPanelRoot: string;
};
export default function ({ store }: {
    store: Store;
}): {
    api: {
        toggleFullscreen(toggled?: boolean): Promise<any>;
        togglePanel(toggled?: boolean): Promise<any>;
        togglePanelPosition(position?: "bottom" | "right"): Promise<any>;
        toggleNav(toggled?: boolean): Promise<any>;
        toggleToolbar(toggled?: boolean): Promise<any>;
        resetLayout(): Promise<any>;
        focusOnUIElement(elementId?: string): void;
        setOptions: (options: any) => void;
    };
    state: any;
};
