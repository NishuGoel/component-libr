"use strict";

require("core-js/modules/es.array.find");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Radio = _interopRequireDefault(require("../types/Radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Radio', function () {
  var knob;
  beforeEach(function () {
    knob = {
      name: 'Color',
      value: '#319C16',
      options: {
        Green: '#319C16',
        Red: '#FF2B2B'
      }
    };
  });
  describe('displays value of button input', function () {
    it('correctly renders labels', function () {
      var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_Radio["default"], {
        knob: knob
      }));
      var greenLabel = wrapper.find('label').first();
      expect(greenLabel.text()).toEqual('Green');
    });
    it('sets value on the radio buttons', function () {
      var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_Radio["default"], {
        knob: knob
      }));
      var greenInput = wrapper.find('input').first();
      expect(greenInput.prop('value')).toEqual('#319C16');
    });
    it('marks the correct checkbox as checked', function () {
      var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_Radio["default"], {
        knob: knob
      }));
      var greenInput = wrapper.find('input').first();
      var redInput = wrapper.find('input').last();
      expect(greenInput.prop('checked')).toEqual(true);
      expect(redInput.prop('checked')).toEqual(false);
    });
  });
});