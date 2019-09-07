"use strict";

require("core-js/modules/es.object.assign");

var _global = require("global");

var _shortcut = require("../lib/shortcut");

var ev = function ev(attr) {
  return new _global.KeyboardEvent('keydown', Object.assign({}, attr));
};

describe('eventToShortcut', function () {
  test('it handles alt key inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      altKey: true,
      key: 'Alt'
    }));
    expect(output).toEqual(null);
  });
  test('it handles ctrl key inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      ctrlKey: true,
      key: 'Control'
    }));
    expect(output).toEqual(null);
  });
  test('it handles meta key inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      metaKey: true,
      key: 'Meta'
    }));
    expect(output).toEqual(null);
  });
  test('it handles shift key inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      shiftKey: true,
      key: 'Shift'
    }));
    expect(output).toEqual(null);
  });
  test('it handles enter key inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      key: 'Enter'
    }));
    expect(output).toEqual(null);
  });
  test('it handles tab key inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      key: 'Tab'
    }));
    expect(output).toEqual(null);
  });
  test('it handles space bar inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      key: ' '
    }));
    expect(output).toEqual(['space']);
  });
  test('it handles escape inputs', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      key: 'Escape'
    }));
    expect(output).toEqual(['escape']);
  });
  test('it capitalizes a letter key through', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      key: 'a'
    }));
    expect(output).toEqual(['A']);
  });
  test('it passes regular key through', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      key: '1'
    }));
    expect(output).toEqual(['1']);
  });
  test('it passes modified regular key through', function () {
    var output = (0, _shortcut.eventToShortcut)(ev({
      altKey: true,
      key: '1'
    }));
    expect(output).toEqual(['alt', '1']);
  });
});
describe('keyToSymbol', function () {
  test('control returns a caret', function () {
    var result = (0, _shortcut.keyToSymbol)('control');
    expect(result).toBe('⌃');
  });
  test('meta returns ⌘', function () {
    var result = (0, _shortcut.keyToSymbol)('meta');
    expect(result).toEqual('⌘');
  });
  test('shift returns ⇧', function () {
    var result = (0, _shortcut.keyToSymbol)('shift');
    expect(result).toBe('⇧​');
  });
  test('enter returns an empty string', function () {
    var result = (0, _shortcut.keyToSymbol)('Enter');
    expect(result).toBe('');
  });
  test("' ' returns SPACE", function () {
    var result = (0, _shortcut.keyToSymbol)(' ');
    expect(result).toEqual('SPACE');
  });
  test('escape returns esc', function () {
    var result = (0, _shortcut.keyToSymbol)('escape');
    expect(result).toEqual('');
  });
  test('ArrowUp returns ↑​​​', function () {
    var result = (0, _shortcut.keyToSymbol)('ArrowUp');
    expect(result).toBe('↑');
  });
  test('ArrowDown returns ↓​​​', function () {
    var result = (0, _shortcut.keyToSymbol)('ArrowDown');
    expect(result).toBe('↓');
  });
  test('ArrowLeft returns ←', function () {
    var result = (0, _shortcut.keyToSymbol)('ArrowLeft');
    expect(result).toBe('←');
  });
  test('ArrowRight returns →', function () {
    var result = (0, _shortcut.keyToSymbol)('ArrowRight');
    expect(result).toBe('→');
  });
  test('it capitalizes a lowercase key', function () {
    var output = (0, _shortcut.keyToSymbol)('a');
    expect(output).toBe('A');
  });
});