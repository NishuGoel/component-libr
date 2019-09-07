import { OPT_OUT } from '../../shared/constants';
import { AddonOptions, AnyFunctionReturns, ContextNode, GenericProp, PropsMap } from '../../shared/types.d';
declare type _getAggregatedWrap = <T>(h: AnyFunctionReturns<T>) => (components: ContextNode['components'], props: GenericProp | typeof OPT_OUT, options: AddonOptions) => AnyFunctionReturns<T>;
export declare const _getAggregatedWrap: _getAggregatedWrap;
declare type getRendererFrom = <T>(h: AnyFunctionReturns<T>) => (contextNodes: ContextNode[], propsMap: PropsMap, getStoryVNode: AnyFunctionReturns<T>) => T;
export declare const getRendererFrom: getRendererFrom;
export {};
