import { action } from '@storybook/addon-actions';
import Button from '../components/action-button/index.marko';

export default {
  title: 'Addons|Actions/Button',
  parameters: {
    component: Button,
  },
};

export const Simple = () => Button.renderSync({ click: action('action logged!') });
