"use strict";

var _utils = require("../utils");

describe('utils', function () {
  it('should apply polished when valid arguments are passed', function () {
    var lightColor = '#F6F9FC';
    var darkColor = '#2f2f2f';
    var darkenedColor = (0, _utils.darkenColor)(lightColor);
    var lightenedColor = (0, _utils.lightenColor)(darkColor);
    expect(darkenedColor).toEqual('rgba(0,0,0,0.95)');
    expect(lightenedColor).toEqual('rgba(255,255,255,0.95)');
  });
  it('should guard non-string value is being passed to color of theme object', function () {
    var result = function result() {
      return (0, _utils.lightenColor)(1234);
    };

    expect(result).toThrow();
  });
  it('should guard anything that is not working with polished', function () {
    var color = '1234';
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
  it('should guard css variables is being passed to polished functions', function () {
    var color = 'var(--my-var, blue)';
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
  it('should guard css calc is being passed to polished functions', function () {
    var color = 'rgb(calc(0 + 100), calc(0 + 100), calc(0 + 100))';
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
  it('should guard linear-gradient is being passed to polished functions', function () {
    var color = "linear-gradient(to bottom, white, blue)";
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
  it('should guard radial-gradient is being passed to polished functions', function () {
    var color = "radial-gradient(red, green, blue)";
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
  it('should guard repeating-linear-gradient is being passed to polished functions', function () {
    var color = "repeating-linear-gradient(red, yellow 10%, green 20%)";
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
  it('should guard repeating-radial-gradient is being passed to polished functions', function () {
    var color = "repeating-radial-gradient(red, yellow 10%, green 20%)";
    var result = (0, _utils.lightenColor)(color);
    expect(result).toEqual(color);
  });
});