import { PropDef } from '@storybook/components';
import { Component } from '../blocks/shared';
export declare type PropDefGetter = (type: Component) => PropDef[] | null;
export declare const getPropDefs: PropDefGetter;
