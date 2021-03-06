import React, { Component } from 'react';
import ReactSyntaxHighlighter from 'react-syntax-highlighter/prism-light';
export interface WrapperProps {
    bordered?: boolean;
    padded?: boolean;
}
export interface PreProps {
    padded?: boolean;
}
export interface SyntaxHighlighterProps {
    language: string;
    copyable?: boolean;
    bordered?: boolean;
    padded?: boolean;
    format?: boolean;
    className?: string;
}
export interface SyntaxHighlighterState {
    copied: boolean;
}
declare type ReactSyntaxHighlighterProps = React.ComponentProps<typeof ReactSyntaxHighlighter>;
export declare class SyntaxHighlighter extends Component<SyntaxHighlighterProps & ReactSyntaxHighlighterProps, SyntaxHighlighterState> {
    static defaultProps: SyntaxHighlighterProps;
    state: {
        copied: boolean;
    };
    onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    render(): JSX.Element;
}
export {};
