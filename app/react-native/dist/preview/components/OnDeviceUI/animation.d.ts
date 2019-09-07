export declare const getNavigatorPanelPosition: (animatedValue: any, previewWidth: number) => {
    transform: {
        translateX: any;
    }[];
    width: number;
}[];
export declare const getAddonPanelPosition: (animatedValue: any, previewWidth: number) => {
    transform: {
        translateX: any;
    }[];
    width: number;
}[];
export declare const getPreviewPosition: (animatedValue: any, previewWidth: number, previewHeight: number, slideBetweenAnimation: boolean) => {
    transform: ({
        translateX: any;
        translateY?: undefined;
    } | {
        translateY: any;
        translateX?: undefined;
    })[];
};
export declare const getPreviewScale: (animatedValue: any, slideBetweenAnimation: boolean) => {
    transform: {
        scale: any;
    }[];
};
