import 'graphiql/graphiql.css';
export interface FetcherParams {
    query: string;
    variables?: string;
    operationName?: string;
}
export interface SetupGraphiQLConfig {
    url: string;
    fetcher?: (params: FetcherParams) => Promise<any>;
}
export declare const setupGraphiQL: (config: SetupGraphiQLConfig) => (_query: string, variables?: string) => () => JSX.Element;
