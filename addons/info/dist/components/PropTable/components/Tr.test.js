"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Tr = _interopRequireDefault(require("./Tr"));

var _Td = _interopRequireDefault(require("./Td"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PropTable/Tr', function () {
  it('renders a tr html node with react element children', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Tr["default"], null, _react["default"].createElement(_Td["default"], null, "foo bar"), _react["default"].createElement(_Td["default"], null, "baz")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a tr html node with html node children', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Tr["default"], null, "foo bar baz"));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a tr html node with one child node', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Tr["default"], null, "foo bar"));
    expect(wrapper).toMatchSnapshot();
  });
});