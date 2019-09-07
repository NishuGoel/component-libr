import { StoryFn } from '@storybook/addons';
import { StoryFnAngularReturnType } from './types';
export default function render({ storyFn, showMain, forceRender, }: {
    storyFn: StoryFn<StoryFnAngularReturnType>;
    showMain: () => void;
    forceRender: boolean;
}): void;
