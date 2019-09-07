import { ActionDisplay } from '@storybook/addon-actions';
interface ActionLoggerProps {
    actions: ActionDisplay[];
    onClear: () => void;
}
export declare const ActionLogger: ({ actions, onClear }: ActionLoggerProps) => JSX.Element;
export default ActionLogger;
