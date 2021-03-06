import { toId } from '@storybook/router';
declare type Direction = -1 | 1;
declare type StoryId = string;
declare type ParameterName = string;
declare type ViewMode = 'story' | 'info' | 'settings' | undefined;
export interface SubState {
    storiesHash: StoriesHash;
    storyId: StoryId;
    viewMode: ViewMode;
    storiesConfigured: boolean;
}
export interface SubAPI {
    storyId: typeof toId;
    selectStory: (kindOrId: string, story?: string, obj?: any) => void;
    getCurrentStoryData: () => Story | Group;
    setStories: (stories: StoriesRaw) => void;
    jumpToComponent: (direction: Direction) => void;
    jumpToStory: (direction: Direction) => void;
    getData: (storyId: StoryId) => Story | Group;
    getParameters: (storyId: StoryId, parameterName?: ParameterName) => Story['parameters'] | any;
    getCurrentParameter<S>(parameterName?: ParameterName): S;
}
interface Group {
    id: StoryId;
    name: string;
    children: StoryId[];
    parent: StoryId;
    depth: number;
    isComponent: boolean;
    isRoot: boolean;
    isLeaf: boolean;
}
interface StoryInput {
    id: StoryId;
    name: string;
    kind: string;
    children: string[];
    parameters: {
        filename: string;
        options: {
            hierarchyRootSeparator: RegExp;
            hierarchySeparator: RegExp;
            [key: string]: any;
        };
        [parameterName: string]: any;
    };
    isLeaf: boolean;
}
declare type Story = StoryInput & Group;
export interface StoriesHash {
    [id: string]: Group | Story;
}
export declare type StoriesList = (Group | Story)[];
export declare type GroupsList = Group[];
export interface StoriesRaw {
    [id: string]: StoryInput;
}
declare const initStoriesApi: ({ store, navigate, storyId: initialStoryId, viewMode: initialViewMode, }: any) => {
    api: {
        storyId: any;
        selectStory: (kindOrId: string, story?: string) => void;
        getCurrentStoryData: () => any;
        setStories: (input: StoriesRaw) => void;
        jumpToComponent: (direction: Direction) => void;
        jumpToStory: (direction: Direction) => void;
        getData: (storyId: string) => any;
        getParameters: (storyId: string, parameterName?: string) => any;
        getCurrentParameter: <S>(parameterName: string) => S;
    };
    state: {
        storiesHash: {};
        storyId: any;
        viewMode: any;
        storiesConfigured: boolean;
    };
};
export default initStoriesApi;
