declare global {
    interface Window {
        NODE_ENV: 'string' | 'development' | undefined;
    }
}
export declare const renderNgApp: (storyFn: any, forced: boolean) => void;
