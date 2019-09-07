import { Channel, Listener } from '@storybook/channels';
export interface SubAPI {
    getChannel: () => Channel;
    on: (type: string, cb: Listener, peer?: boolean) => () => void;
    off: (type: string, cb: Listener) => void;
    emit: (type: string, ...args: any[]) => void;
    once: (type: string, cb: Listener) => void;
    onStory: (cb: Listener) => void;
}
declare const _default: ({ provider }: any) => {
    api: SubAPI;
};
export default _default;
