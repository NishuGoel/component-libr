"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Table = _interopRequireDefault(require("./Table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PropTable/Table', function () {
  it('renders a table html node with one child element', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Table["default"], null, _react["default"].createElement("div", null, "foo bar")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a table html node with multiple children elements', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Table["default"], null, _react["default"].createElement("div", null, "foo bar"), _react["default"].createElement("div", null, "baz")));
    expect(wrapper).toMatchSnapshot();
  });
});