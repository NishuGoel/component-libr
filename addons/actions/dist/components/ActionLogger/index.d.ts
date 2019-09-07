import { ActionDisplay } from '../../models';
export declare const Wrapper: any;
interface ActionLoggerProps {
    actions: ActionDisplay[];
    onClear: () => void;
}
export declare const ActionLogger: ({ actions, onClear }: ActionLoggerProps) => JSX.Element;
export {};
