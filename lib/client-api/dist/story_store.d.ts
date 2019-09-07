import EventEmitter from 'eventemitter3';
import { Channel } from '@storybook/channels';
import { StoryFn, Parameters } from '@storybook/addons';
import { DecoratorFunction, LegacyData, StoreData, AddStoryArgs, StoreItem, ErrorLike } from './types';
interface Selection {
    storyId: string;
    viewMode: string;
}
export default class StoryStore extends EventEmitter {
    _error?: ErrorLike;
    _channel: Channel;
    _data: StoreData;
    _legacyData?: LegacyData;
    _legacydata: LegacyData;
    _revision: number;
    _selection: Selection;
    constructor(params: {
        channel: Channel;
    });
    setChannel: (channel: any) => void;
    fromId: (id: string) => StoreItem;
    raw(): StoreItem[];
    extract(): {};
    setSelection(data: Selection | undefined, error: ErrorLike): void;
    getSelection: () => Selection;
    getError: () => ErrorLike;
    remove: (id: string) => void;
    addStory({ id, kind, name, storyFn: original, parameters }: AddStoryArgs, { getDecorators, applyDecorators, }: {
        getDecorators: () => DecoratorFunction[];
        applyDecorators: (fn: StoryFn, decorators: DecoratorFunction[]) => any;
    }): void;
    pushToManager: (() => void) & import("lodash").Cancelable;
    getRevision(): number;
    incrementRevision(): void;
    addLegacyStory({ kind, name, storyFn, parameters, }: {
        kind: string;
        name: string;
        storyFn: StoryFn;
        parameters: Parameters;
    }): void;
    getStoryKinds(): string[];
    getStories(kind: string): any[];
    getStoryFileName(kind: string): string;
    getStoryAndParameters(kind: string, name: string): {
        story: any;
        parameters: any;
    };
    getStory(kind: string, name: string): any;
    getStoryWithContext(kind: string, name: string): any;
    removeStoryKind(kind: string): void;
    hasStoryKind(kind: string): boolean;
    hasStory(kind: string, name: string): boolean;
    dumpStoryBook(): {
        kind: string;
        stories: any[];
    }[];
    size(): number;
    clean(): void;
}
export {};
