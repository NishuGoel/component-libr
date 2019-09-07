import { Configuration, RuleSetRule } from 'webpack';
export declare function getReactScriptsPath({ noCache }?: {
    noCache?: boolean;
}): string;
export declare function isReactScriptsInstalled(requiredVersion?: string): boolean;
export declare const getRules: (extensions: string[]) => (rules: RuleSetRule[]) => any;
export declare const getTypeScriptRules: (webpackConfigRules: RuleSetRule[], configDir: string) => any;
export declare const getModulePath: () => any;
export declare function getCraWebpackConfig(mode: 'development' | 'production' | 'none'): any;
export declare function applyCRAWebpackConfig(baseConfig: Configuration, configDir: string): Configuration;
