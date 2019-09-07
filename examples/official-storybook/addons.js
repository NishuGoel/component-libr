import '@storybook/addon-storysource/register';
import '@storybook/addon-design-assets/register';
import '@storybook/addon-docs/register';
import '@storybook/addon-actions/register';
import '@storybook/addon-links/register';
import '@storybook/addon-events/register';
import '@storybook/addon-notes/register';
import '@storybook/addon-options/register';
import '@storybook/addon-knobs/register';
import '@storybook/addon-cssresources/register';
import '@storybook/addon-backgrounds/register';
import '@storybook/addon-a11y/register';
import '@storybook/addon-jest/register';
import '@storybook/addon-viewport/register';
import '@storybook/addon-graphql/register';
import '@storybook/addon-contexts/register';

import addHeadWarning from './head-warning';

addHeadWarning('manager-head-not-loaded', 'Manager head not loaded');
