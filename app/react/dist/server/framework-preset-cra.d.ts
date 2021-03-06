import { Configuration } from 'webpack';
export declare function webpackFinal(config: Configuration, { configDir }: {
    configDir: string;
}): Configuration;
export declare function managerWebpack(config: Configuration): Configuration;
export declare function babelDefault(config: Configuration): Configuration | {
    presets: string[];
    plugins: (string | {
        loaderMap: {
            svg: {
                ReactComponent: string;
            };
        };
    })[][];
    mode?: "development" | "production" | "none";
    name?: string;
    context?: string;
    entry?: string | string[] | import("webpack").Entry | import("webpack").EntryFunc;
    devtool?: import("webpack").Options.Devtool;
    output?: import("webpack").Output;
    module?: import("webpack").Module;
    resolve?: import("webpack").Resolve;
    resolveLoader?: import("webpack").ResolveLoader;
    externals?: string | RegExp | import("webpack").ExternalsObjectElement | import("webpack").ExternalsFunctionElement | import("webpack").ExternalsElement[];
    target?: "web" | "webworker" | "node" | "async-node" | "node-webkit" | "atom" | "electron" | "electron-renderer" | "electron-main" | ((compiler?: any) => void);
    bail?: boolean;
    profile?: boolean;
    cache?: boolean | object;
    watch?: boolean;
    watchOptions?: import("webpack").ICompiler.WatchOptions;
    debug?: boolean;
    node?: false | import("webpack").Node;
    amd?: {
        [moduleName: string]: boolean;
    };
    recordsPath?: string;
    recordsInputPath?: string;
    recordsOutputPath?: string;
    stats?: import("webpack").Stats.ToStringOptions;
    performance?: false | import("webpack").Options.Performance;
    parallelism?: number;
    optimization?: import("webpack").Options.Optimization;
};
