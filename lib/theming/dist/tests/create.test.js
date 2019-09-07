"use strict";

var _create = require("../create");

var _dark = _interopRequireDefault(require("../themes/dark"));

var _light = _interopRequireDefault(require("../themes/light"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('create base', function () {
  it('should create a theme with minimal viable theme', function () {
    var result = (0, _create.create)({
      base: 'light'
    });
    expect(result).toBeDefined();
  });
  it('should pick `light` when `base` is missing', function () {
    var result = (0, _create.create)({
      base: undefined
    });
    expect(result.base).toBe('light');
  });
  it('should pick `light` when nothing is given', function () {
    var result = (0, _create.create)();
    expect(result.base).toBe('light');
  });
  it('should pick `dark` when base is dark', function () {
    var result = (0, _create.create)({
      base: 'dark'
    });
    expect(result.base).toBe('dark');
  });
  it('should pick `light` when base is a unknown value', function () {
    var result = (0, _create.create)({
      base: 'foobar'
    });
    expect(result.base).toBe('light');
  });
});
describe('create merge', function () {
  it('should merge colorPrimary', function () {
    var result = (0, _create.create)({
      base: 'light',
      colorPrimary: 'orange'
    });
    expect(result).toHaveProperty('colorPrimary', 'orange');
  });
  it('should merge colorSecondary', function () {
    var result = (0, _create.create)({
      base: 'light',
      colorSecondary: 'orange'
    });
    expect(result).toHaveProperty('colorSecondary', 'orange');
  });
  it('should merge appBg', function () {
    var result = (0, _create.create)({
      base: 'light',
      appBg: 'orange'
    });
    expect(result).toHaveProperty('appBg', 'orange');
  });
});
describe('create brand', function () {
  it('should have default', function () {
    var result = (0, _create.create)({
      base: 'light'
    });
    expect(result.brandImage).not.toBeDefined();
    expect(result.brandTitle).not.toBeDefined();
    expect(result.brandUrl).not.toBeDefined();
  });
  it('should accept null', function () {
    var result = (0, _create.create)({
      base: 'light',
      brandTitle: null,
      brandUrl: null,
      brandImage: null
    });
    expect(result).toMatchObject({
      brandImage: null,
      brandTitle: null,
      brandUrl: null
    });
  });
  it('should accept values', function () {
    var result = (0, _create.create)({
      base: 'light',
      brandImage: 'https://placehold.it/350x150',
      brandTitle: 'my custom storybook',
      brandUrl: 'https://example.com'
    });
    expect(result).toMatchObject({
      brandImage: 'https://placehold.it/350x150',
      brandTitle: 'my custom storybook',
      brandUrl: 'https://example.com'
    });
  });
});
describe('create grid', function () {
  it('should have default', function () {
    var result = (0, _create.create)({
      base: 'light'
    });
    expect(result.gridCellSize).not.toBeDefined();
  });
  it('should accept null', function () {
    var result = (0, _create.create)({
      base: 'light',
      gridCellSize: null
    });
    expect(result).toMatchObject({
      gridCellSize: null
    });
  });
  it('should accept values', function () {
    var result = (0, _create.create)({
      base: 'light',
      gridCellSize: 12
    });
    expect(result).toMatchObject({
      gridCellSize: 12
    });
  });
});
describe('create extend', function () {
  it('should allow custom props', function () {
    var result = (0, _create.create)({
      base: 'light'
    }, {
      myCustomProperty: 42
    });
    expect(result.myCustomProperty).toEqual(42);
  });
  it('should not allow overriding known properties with custom props', function () {
    var result = (0, _create.create)({
      base: 'light'
    }, {
      base: 42
    });
    expect(result.base).toEqual('light');
  });
});