import { ReactNode } from 'react';
export interface OnEmitEvent {
    name: string;
    payload: unknown;
}
export interface Event {
    name: string;
    title: string;
    payload: unknown;
}
interface Options {
    children?: ReactNode;
    emit: (eventName: string, ...args: any) => void;
    events: Event[];
}
declare const _default: (options: Options) => any;
export default _default;
