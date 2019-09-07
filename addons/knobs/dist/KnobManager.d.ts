import { Channel } from '@storybook/channels';
import KnobStore from './KnobStore';
import { Knob, KnobType } from './type-defs';
interface KnobManagerOptions {
    escapeHTML?: boolean;
    disableDebounce?: boolean;
}
export default class KnobManager {
    knobStore: KnobStore;
    channel: Channel;
    options: KnobManagerOptions;
    calling: boolean;
    setChannel(channel: Channel): void;
    setOptions(options: KnobManagerOptions): void;
    getKnobValue({ value }: Knob): any;
    knob<T extends KnobType = any>(name: string, options: Knob<T>): Knob<T>['value'];
    _mayCallChannel(): void;
}
export {};
