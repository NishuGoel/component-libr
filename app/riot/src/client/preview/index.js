import { start } from '@storybook/core/client';

import './globals';
import riot, { tag2, mount as vendorMount } from 'riot';
import render from './render';
import { compileNow as unboundCompileNow, asCompiledCode } from './compileStageFunctions';

const { load: coreLoad, clientApi, configApi, forceReRender } = start(render);

export const {
  setAddon,
  addDecorator,
  addParameters,
  clearDecorators,
  getStorybook,
  raw,
} = clientApi;

const framework = 'riot';
export const storiesOf = (...args) => clientApi.storiesOf(...args).addParameters({ framework });
export const load = (...args) => coreLoad(...args, framework);

export const { configure } = configApi;
const mount = vendorMount.bind(riot, '#root');
const compileNow = unboundCompileNow.bind(null, tag2);
export { forceReRender, render, tag2 as tag, mount, compileNow, asCompiledCode };
