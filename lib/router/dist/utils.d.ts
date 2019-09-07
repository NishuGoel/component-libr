interface StoryData {
    viewMode?: string;
    storyId?: string;
}
interface SeparatorOptions {
    rootSeparator: string | RegExp;
    groupSeparator: string | RegExp;
}
export declare const sanitize: (string: string) => string;
export declare const toId: (kind: string, name: string) => string;
export declare const parsePath: (path?: string) => StoryData;
interface Query {
    [key: string]: any;
}
export declare const queryFromString: any;
export declare const queryFromLocation: (location: {
    search: string;
}) => any;
export declare const stringifyQuery: (query: Query) => any;
export declare const getMatch: any;
export declare const parseKind: (kind: string, { rootSeparator, groupSeparator }: SeparatorOptions) => {
    root: string;
    groups: string[];
};
export {};
