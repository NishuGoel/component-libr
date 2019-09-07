/// <reference types="webpack-env" />
import { ClientApiParams, DecoratorFunction, StoryApi } from './types';
import StoryStore from './story_store';
export declare const defaultDecorateStory: (storyFn: any, decorators: DecoratorFunction[]) => any;
export default class ClientApi {
    private _storyStore;
    private _addons;
    private _globalDecorators;
    private _globalParameters;
    private _decorateStory;
    constructor({ storyStore, decorateStory }: ClientApiParams);
    setAddon: (addon: any) => void;
    getSeparators: () => any;
    addDecorator: (decorator: DecoratorFunction) => void;
    addParameters: (parameters: any) => void;
    clearDecorators: () => void;
    storiesOf: <TApi = unknown>(kind: string, m: NodeModule) => StoryApi<TApi>;
    getStorybook: () => {
        kind: string;
        fileName: string;
        stories: {
            name: any;
            render: any;
        }[];
    }[];
    raw: () => import("./types").StoreItem[];
    store: () => StoryStore;
}
