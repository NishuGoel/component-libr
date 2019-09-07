"use strict";

var _convert = require("../convert");

var _create = require("../create");

var _dark = _interopRequireDefault(require("../themes/dark"));

var _light = _interopRequireDefault(require("../themes/light"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('convert', function () {
  it('should return the default theme when no params', function () {
    var result = (0, _convert.convert)();
    expect(result.base).toEqual('light');
  });
  it('should return a valid dark theme', function () {
    var result = (0, _convert.convert)(_dark["default"]);
    expect(result.base).toEqual('dark');
    expect(result).toMatchObject({
      color: expect.objectContaining({
        primary: '#FF4785',
        secondary: '#1EA7FD'
      }),
      background: expect.objectContaining({
        app: '#2f2f2f'
      })
    });
  });
  it('should return a valid light theme', function () {
    var result = (0, _convert.convert)(_light["default"]);
    expect(result.base).toEqual('light');
    expect(result).toMatchObject({
      color: expect.objectContaining({
        primary: '#FF4785',
        secondary: '#1EA7FD'
      }),
      background: expect.objectContaining({
        app: '#F6F9FC'
      })
    });
  });
  it('should map optional vars', function () {
    var customVars = (0, _create.create)({
      base: 'light',
      brandTitle: 'my custom storybook',
      gridCellSize: 12
    });
    var result = (0, _convert.convert)(customVars);
    expect(result.base).toEqual('light');
    expect(result).toMatchObject({
      background: expect.objectContaining({
        gridCellSize: 12
      }),
      brand: expect.objectContaining({
        title: 'my custom storybook'
      })
    });
  });
});