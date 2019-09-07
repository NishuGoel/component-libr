import { Module } from '../index';
import { PanelPositions } from './layout';
interface Additions {
    isFullscreen?: boolean;
    showPanel?: boolean;
    panelPosition?: PanelPositions;
    showNav?: boolean;
    selectedPanel?: string;
    viewMode?: string;
}
export interface QueryParams {
    [key: string]: string | null;
}
export interface SubAPI {
    getQueryParam: (key: string) => string | undefined;
    getUrlState: () => {
        queryParams: QueryParams;
        path: string;
        viewMode?: string;
        storyId?: string;
        url: string;
    };
    setQueryParams: (input: QueryParams) => void;
}
export default function ({ store, navigate, state, provider, ...rest }: Module): {
    api: SubAPI;
    state: {
        viewMode: any;
        layout: Additions;
        selectedPanel: any;
        location: any;
        path: any;
        customQueryParams: any;
        storyId: any;
    };
};
export {};
