"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Tbody = _interopRequireDefault(require("./Tbody"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PropTable/Tbody', function () {
  it('renders a tbody html node with children', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Tbody["default"], null, _react["default"].createElement("div", null, "foo bar")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a tbody html node with multiple children elements', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Tbody["default"], null, _react["default"].createElement("div", null, "foo bar"), _react["default"].createElement("div", null, "baz")));
    expect(wrapper).toMatchSnapshot();
  });
});