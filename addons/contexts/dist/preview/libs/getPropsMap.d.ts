import { OPT_OUT } from '../../shared/constants';
import { ContextNode, GenericProp, PropsMap, SelectionState } from '../../shared/types.d';
declare type _getPropsByParamName = (params: ContextNode['params'], name?: string, options?: Partial<ContextNode['options']>) => GenericProp | typeof OPT_OUT;
export declare const _getPropsByParamName: _getPropsByParamName;
declare type getPropsMap = (contextNodes: ContextNode[], selectionState: SelectionState) => PropsMap;
export declare const getPropsMap: getPropsMap;
export {};
