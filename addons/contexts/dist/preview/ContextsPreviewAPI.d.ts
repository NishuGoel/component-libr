import { ContextNode, PropsMap, SelectionState } from '../shared/types.d';
export declare const ContextsPreviewAPI: () => {
    getContextNodes: (settings: import("../shared/types").WrapperSettings) => ContextNode[];
    getSelectionState: () => SelectionState;
    getPropsMap: (contextNodes: ContextNode[], selectionState: SelectionState) => PropsMap;
    getRendererFrom: <T>(h: import("../shared/types").AnyFunctionReturns<T>) => (contextNodes: ContextNode[], propsMap: PropsMap, getStoryVNode: import("../shared/types").AnyFunctionReturns<T>) => T;
    updateReactiveSystem: (propsMap: PropsMap) => PropsMap;
};
