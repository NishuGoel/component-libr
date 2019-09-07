"use strict";

require("core-js/modules/es.array.find");

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Select = _interopRequireDefault(require("../types/Select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Select', function () {
  var knob;
  describe('Object values', function () {
    beforeEach(function () {
      knob = {
        name: 'Colors',
        value: '#00ff00',
        options: {
          Green: '#00ff00',
          Red: '#ff0000'
        }
      };
    });
    it('correctly maps option keys and values', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Select["default"], {
        knob: knob
      }));
      var green = wrapper.find('option').first();
      expect(green.text()).toEqual('Green');
      expect(green.prop('value')).toEqual('Green');
    });
  });
  describe('Array values', function () {
    beforeEach(function () {
      knob = {
        name: 'Colors',
        value: 'green',
        options: ['green', 'red']
      };
    });
    it('correctly maps option keys and values', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Select["default"], {
        knob: knob
      }));
      var green = wrapper.find('option').first();
      expect(green.text()).toEqual('green');
      expect(green.prop('value')).toEqual('green');
    });
  });
});