import React from 'react';
import { Combo } from './index';
export declare const createContext: ({ api, state }: Combo) => React.Context<{
    api: import(".").API;
    state: any;
}>;
