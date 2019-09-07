import { PureComponent } from 'react';
import { EmitterSubscription } from 'react-native';
export interface PreviewDimens {
    previewWidth: number;
    previewHeight: number;
}
declare type Props = {
    onLayout: (dimens: PreviewDimens) => void;
} & PreviewDimens;
export default class AbsolutePositionedKeyboardAwareView extends PureComponent<Props> {
    keyboardDidShowListener: EmitterSubscription;
    keyboardDidHideListener: EmitterSubscription;
    keyboardOpen: boolean;
    componentWillMount(): void;
    componentWillUnmount(): void;
    keyboardDidShowHandler: (e: any) => void;
    removeKeyboardOnOrientationChange: () => void;
    keyboardDidHideHandler: () => void;
    onLayoutHandler: ({ nativeEvent }: any) => void;
    render(): JSX.Element;
}
export {};
