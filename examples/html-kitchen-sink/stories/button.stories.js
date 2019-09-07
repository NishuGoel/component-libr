import { document } from 'global';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Demo',
};

export const heading = () => '<h1>Hello World</h1>';
export const headings = () =>
  '<h1>Hello World</h1><h2>Hello World</h2><h3>Hello World</h3><h4>Hello World</h4>';

export const button = () => {
  const btn = document.createElement('button');
  btn.innerHTML = 'Hello Button';
  btn.addEventListener('click', action('Click'));
  return btn;
};
