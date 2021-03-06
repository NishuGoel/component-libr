import { ReactElement } from 'react';
import { API } from '@storybook/api';
import { Types } from './types';
export interface RenderOptions {
    active: boolean;
    key: string;
}
export interface RouteOptions {
    storyId: string;
}
export interface MatchOptions {
    viewMode: string;
}
export interface Addon {
    title: string;
    type?: Types;
    id?: string;
    route?: (routeOptions: RouteOptions) => string;
    match?: (matchOptions: MatchOptions) => boolean;
    render: (renderOptions: RenderOptions) => ReactElement<any>;
    paramKey?: string;
}
export declare type Loader = (api: API) => void;
export interface Collection {
    [key: string]: Addon;
}
export declare class AddonStore {
    constructor();
    private loaders;
    private elements;
    private channel;
    private promise;
    private resolve;
    getChannel: () => any;
    ready: () => Promise<any>;
    hasChannel: () => boolean;
    setChannel: (channel: any) => void;
    getElements: (type: string) => Collection;
    addPanel: (name: string, options: Addon) => void;
    add: (name: string, addon: Addon) => void;
    register: (name: string, registerCallback: (api: any) => void) => void;
    loadAddons: (api: any) => void;
}
export declare const addons: AddonStore;
