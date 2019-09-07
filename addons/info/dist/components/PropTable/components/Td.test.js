"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Td = _interopRequireDefault(require("./Td"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PropTable/Td', function () {
  it('renders a td html node child element', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Td["default"], null, _react["default"].createElement("div", null, "foo bar")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a monospace td html node child element', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Td["default"], {
      isMonospace: true
    }, _react["default"].createElement("div", null, "foo bar")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a td html node with multiple children elements', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Td["default"], null, _react["default"].createElement("div", null, "foo bar"), _react["default"].createElement("div", null, "baz")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a monospace td html node with multiple children elements', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Td["default"], {
      isMonospace: true
    }, _react["default"].createElement("div", null, "foo bar"), _react["default"].createElement("div", null, "baz")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a td html node with one child node', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Td["default"], null, "foo bar"));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a monospace td html node with one child node', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Td["default"], {
      isMonospace: true
    }, "foo bar"));
    expect(wrapper).toMatchSnapshot();
  });
});