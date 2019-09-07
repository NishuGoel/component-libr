/// <reference types="node" />
import { Addon } from './index';
export declare enum types {
    TAB = "tab",
    PANEL = "panel",
    TOOL = "tool",
    PREVIEW = "preview",
    NOTES_ELEMENT = "notes-element"
}
export declare type Types = types | string;
export declare function isSupportedType(type: Types): boolean;
export interface Parameters {
    fileName?: string;
    options?: OptionsParameter;
    [key: string]: any;
}
export interface StoryContext {
    id: string;
    name: string;
    kind: string;
    [key: string]: any;
    parameters: Parameters;
}
export interface WrapperSettings {
    options: OptionsParameter;
    parameters: {
        [key: string]: any;
    };
}
export interface OptionsParameter extends Object {
    storySort?: any;
    hierarchyRootSeparator?: string;
    hierarchySeparator?: RegExp;
    theme?: {
        base: string;
        brandTitle?: string;
    };
    [key: string]: any;
}
export declare type StoryGetter = (context: StoryContext) => any;
export declare type StoryFn<ReturnType = unknown> = (p?: StoryContext) => ReturnType;
export declare type StoryWrapper = (getStory: StoryGetter, context: StoryContext, settings: WrapperSettings) => any;
export declare type MakeDecoratorResult = (...args: any) => any;
export interface AddStoryArgs<ReturnType = unknown> {
    id: string;
    kind: string;
    name: string;
    storyFn: StoryFn<ReturnType>;
    parameters: Parameters;
}
export interface ClientApiAddon<TApi = unknown> extends Addon {
    apply: (a: StoryApi<TApi>, b: any[]) => any;
}
export interface ClientApiAddons<TApi> {
    [key: string]: ClientApiAddon<TApi>;
}
export declare type ClientApiReturnFn<TApi> = (...args: any[]) => StoryApi<TApi>;
export interface StoryApi<StoryFnReturnType> {
    kind: string;
    add: (storyName: string, storyFn: StoryFn<StoryFnReturnType>, parameters?: Parameters) => StoryApi<StoryFnReturnType>;
    addDecorator: (decorator: DecoratorFunction) => StoryApi<StoryFnReturnType>;
    addParameters: (parameters: Parameters) => StoryApi<StoryFnReturnType>;
    [k: string]: string | ClientApiReturnFn<StoryFnReturnType>;
}
export declare type DecoratorFunction = (fn: StoryFn, c: StoryContext) => ReturnType<StoryFn>;
export interface ClientStoryApi<TApi> {
    storiesOf(kind: string, module: NodeModule): StoryApi<TApi>;
    addDecorator(decorator: DecoratorFunction): StoryApi<TApi>;
    addParameters(parameter: Parameters): StoryApi<TApi>;
}
