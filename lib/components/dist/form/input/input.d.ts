import { FunctionComponent } from 'react';
declare type Sizes = '100%' | 'flex' | 'auto';
declare type Alignments = 'end' | 'center' | 'start';
declare type ValidationStates = 'valid' | 'error' | 'warn';
export interface InputStyleProps {
    size?: Sizes;
    align?: Alignments;
    valid?: ValidationStates;
}
export declare const Input: any;
export declare const Select: any;
export declare const Textarea: any;
export declare const Button: FunctionComponent<any>;
export {};
