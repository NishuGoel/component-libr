import { load, addParameters, addDecorator } from '@storybook/angular';
import { withA11y } from '@storybook/addon-a11y';
import { DocsPage } from '@storybook/addon-docs/blocks';
import addCssWarning from '../src/cssWarning';

addDecorator(withA11y);
addCssWarning();

addParameters({
  options: {
    hierarchyRootSeparator: /\|/,
    docs: {
      iframeHeight: '60px',
    },
  },
  docs: DocsPage,
});

load(require.context('../src/stories', true, /\.stories\.ts$/), module);
load(require.context('../src/stories', true, /\.stories\.mdx$/), module);
