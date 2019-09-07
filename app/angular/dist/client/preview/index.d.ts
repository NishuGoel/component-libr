/// <reference types="node" />
/// <reference types="webpack-env" />
import { ClientStoryApi } from '@storybook/addons';
import './globals';
import { IStorybookSection, StoryFnAngularReturnType } from './types';
interface ClientApi extends ClientStoryApi<StoryFnAngularReturnType> {
    setAddon(addon: any): void;
    configure(loaders: () => void, module: NodeModule): void;
    getStorybook(): IStorybookSection[];
    clearDecorators(): void;
    forceReRender(): void;
    raw: () => any;
    load: (...args: any[]) => void;
}
export declare const storiesOf: ClientApi['storiesOf'];
export declare const load: ClientApi['load'];
export declare const addDecorator: ClientApi['addDecorator'];
export declare const addParameters: ClientApi['addParameters'];
export declare const clearDecorators: ClientApi['clearDecorators'];
export declare const setAddon: ClientApi['setAddon'];
export declare const configure: ClientApi['configure'];
export declare const forceReRender: ClientApi['forceReRender'];
export declare const getStorybook: ClientApi['getStorybook'];
export declare const raw: ClientApi['raw'];
export {};
