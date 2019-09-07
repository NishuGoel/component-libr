"use strict";

var _testUtils = require("jscodeshift/dist/testUtils");

jest.mock('@storybook/node-logger');
const testNames = ['basic', 'decorators', 'parameters', 'story-parameters', 'module', 'multi', 'default'];
testNames.forEach(testName => {
  (0, _testUtils.defineTest)(__dirname, `convert-to-module-format`, null, `convert-to-module-format/${testName}`);
});