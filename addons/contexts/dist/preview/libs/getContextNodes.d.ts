import { AddonSetting, ContextNode, WrapperSettings } from '../../shared/types.d';
declare type _getMergedSettings = (topLevel: Partial<AddonSetting>, storyLevel: Partial<AddonSetting>) => ContextNode;
export declare const _getMergedSettings: _getMergedSettings;
declare type getContextNodes = (settings: WrapperSettings) => ContextNode[];
export declare const getContextNodes: getContextNodes;
export {};
