import { Parameters } from '@storybook/addons';
interface AddonParameters extends Parameters {
    jest?: string | string[] | {
        disable: true;
    };
}
export declare const withTests: (userOptions: {
    results: any;
    filesExt?: string;
}) => (args_0: string | (() => void), args_1: {
    kind: string;
    parameters: AddonParameters;
}) => any;
export {};
