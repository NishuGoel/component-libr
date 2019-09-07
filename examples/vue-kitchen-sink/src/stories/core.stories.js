import { addParameters } from '@storybook/vue';

const globalParameter = 'globalParameter';
const chapterParameter = 'chapterParameter';
const storyParameter = 'storyParameter';

addParameters({ globalParameter });

export default {
  title: 'Core|Parameters',
  parameters: {
    chapterParameter,
  },
};

export const passedToStory = ({ parameters: { fileName, ...parameters } }) => ({
  template: `<div>Parameters are ${JSON.stringify(parameters)}</div>`,
});

passedToStory.story = {
  name: 'passed to story',

  parameters: {
    storyParameter,
  },
};
