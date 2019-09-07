"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _Th = _interopRequireDefault(require("./Th"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('PropTable/Th', function () {
  it('renders a th html node with react element children', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Th["default"], null, _react["default"].createElement("div", null, "foo bar"), _react["default"].createElement("div", null, "baz")));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a th html node with html node children', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Th["default"], null, "foo bar baz"));
    expect(wrapper).toMatchSnapshot();
  });
  it('renders a th html node with one child node', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_Th["default"], null, "foo bar"));
    expect(wrapper).toMatchSnapshot();
  });
});