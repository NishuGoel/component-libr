"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Array = _interopRequireDefault(require("../types/Array"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

jest.useFakeTimers();
describe('Array', function () {
  it('should subscribe to setKnobs event of channel', function () {
    var onChange = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Array["default"], {
      onChange: onChange,
      knob: {
        name: 'passions',
        value: ['Fishing', 'Skiing'],
        separator: ','
      }
    }));
    wrapper.simulate('change', {
      target: {
        value: 'Fishing,Skiing,Dancing'
      }
    });
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledWith(['Fishing', 'Skiing', 'Dancing']);
  });
  it('deserializes an Array to an Array', function () {
    var array = ['a', 'b', 'c'];

    var deserialized = _Array["default"].deserialize(array);

    expect(deserialized).toEqual(['a', 'b', 'c']);
  });
  it('deserializes an Object to an Array', function () {
    var object = {
      1: 'one',
      0: 'zero',
      2: 'two'
    };

    var deserialized = _Array["default"].deserialize(object);

    expect(deserialized).toEqual(['zero', 'one', 'two']);
  });
  it('should change to an empty array when emptied', function () {
    var onChange = jest.fn();
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Array["default"], {
      onChange: onChange,
      knob: {
        name: 'passions',
        value: ['Fishing', 'Skiing'],
        separator: ','
      }
    }));
    wrapper.simulate('change', {
      target: {
        value: ''
      }
    });
    jest.runAllTimers();
    expect(onChange).toHaveBeenCalledWith([]);
  });
});