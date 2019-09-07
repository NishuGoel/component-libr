import { HighlightedElementData } from './components/Report/HighlightToggle';
export declare function addElement(payload: {
    element: HTMLElement;
    data: HighlightedElementData;
}): {
    type: string;
    payload: {
        element: HTMLElement;
        data: HighlightedElementData;
    };
};
export declare function clearElements(): {
    type: string;
};
declare const store: any;
export default store;
