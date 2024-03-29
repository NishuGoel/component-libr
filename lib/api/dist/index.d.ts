import { ReactElement, Component } from 'react';
import { RenderData as RouterData } from '@storybook/router';
import { Listener } from '@storybook/channels';
import { SubAPI as ProviderAPI, Provider } from './init-provider-api';
import Store, { Options } from './store';
import { SubAPI as AddonsAPI } from './modules/addons';
import { SubAPI as ChannelAPI } from './modules/channel';
import { SubState as NotificationState, SubAPI as NotificationAPI } from './modules/notifications';
import { SubState as StoriesSubState, SubAPI as StoriesAPI } from './modules/stories';
import { SubState as LayoutSubState, SubAPI as LayoutAPI } from './modules/layout';
import { SubState as ShortcutsSubState, SubAPI as ShortcutsAPI } from './modules/shortcuts';
import { QueryParams, SubAPI as UrlAPI } from './modules/url';
import { SubState as VersionsSubState, SubAPI as VersionsAPI } from './modules/versions';
export { Options as StoreOptions, Listener as ChannelListener };
export declare type Module = StoreData & RouterData & ProviderData & {
    mode?: 'production' | 'development';
    state: State;
};
export declare type State = Other & LayoutSubState & StoriesSubState & NotificationState & VersionsSubState & RouterData & ShortcutsSubState;
export declare type API = AddonsAPI & ChannelAPI & ProviderAPI & StoriesAPI & LayoutAPI & NotificationAPI & ShortcutsAPI & VersionsAPI & UrlAPI & OtherAPI;
interface OtherAPI {
    [key: string]: any;
}
interface Other {
    customQueryParams: QueryParams;
    [key: string]: any;
}
export interface Combo {
    api: API;
    state: State;
}
interface ProviderData {
    provider: Provider;
}
interface DocsModeData {
    docsMode: boolean;
}
interface StoreData {
    store: Store;
}
interface Children {
    children: Component | ((props: Combo) => Component);
}
export declare type Props = Children & RouterData & ProviderData & DocsModeData;
declare class ManagerProvider extends Component<Props, State> {
    static displayName: string;
    api: API;
    modules: any[];
    constructor(props: Props);
    static getDerivedStateFromProps: (props: any, state: any) => any;
    componentDidMount(): void;
    shouldComponentUpdate(nextProps: Props, nextState: State): boolean;
    render(): JSX.Element;
}
interface ConsumerProps<S, C> {
    filter?: (combo: C) => S;
    pure?: boolean;
    children: (d: S | C) => ReactElement<any> | null;
}
interface SubState {
    [key: string]: any;
}
declare class ManagerConsumer extends Component<ConsumerProps<SubState, Combo>> {
    dataMemory?: (combo: Combo) => SubState;
    prevChildren?: ReactElement<any> | null;
    prevData?: SubState;
    constructor(props: ConsumerProps<SubState, Combo>);
    render(): JSX.Element;
}
export declare function useStorybookState(): State;
export declare function useStorybookApi(): API;
export { ManagerConsumer as Consumer, ManagerProvider as Provider };
export interface EventMap {
    [eventId: string]: Listener;
}
declare type StateMerger<S> = (input: S) => S;
export declare function useAddonState<S>(addonId: string, defaultState?: S): [S, (newStateOrMerger: S | StateMerger<S>, options?: Options) => Promise<S>];
export declare const useChannel: (eventMap: EventMap) => (type: string, ...args: any[]) => void;
export declare function useParameter<S>(parameterKey: string, defaultValue?: S): S;
