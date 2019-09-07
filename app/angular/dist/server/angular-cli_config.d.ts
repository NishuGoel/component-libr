import { Path } from '@angular-devkit/core';
interface BasicOptions {
    options: {
        baseUrl?: string | undefined;
    };
    raw: object;
    fileNames: string[];
    errors: any[];
}
export declare function getAngularCliWebpackConfigOptions(dirToSearch: Path): {
    root: any;
    projectRoot: string;
    tsConfigPath: any;
    tsConfig: BasicOptions;
    supportES2015: boolean;
    buildOptions: any;
};
export declare function applyAngularCliWebpackConfig(baseConfig: any, cliWebpackConfigOptions: any): any;
export {};
