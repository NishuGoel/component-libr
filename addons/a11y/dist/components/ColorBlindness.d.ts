import { Component, ReactNode } from 'react';
interface ColorBlindnessProps {
}
interface ColorBlindnessState {
    active: string | null;
}
export interface Link {
    id: string;
    title: ReactNode;
    right?: ReactNode;
    active: boolean;
    onClick: () => void;
}
export declare class ColorBlindness extends Component<ColorBlindnessProps, ColorBlindnessState> {
    state: ColorBlindnessState;
    setActive: (active: string) => void;
    render(): JSX.Element;
}
export {};
