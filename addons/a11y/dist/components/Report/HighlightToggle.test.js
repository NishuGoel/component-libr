"use strict";

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _reactRedux = require("react-redux");

var _theming = require("@storybook/theming");

var _HighlightToggle = _interopRequireDefault(require("./HighlightToggle"));

var _reduxConfig = _interopRequireDefault(require("../../redux-config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ThemedHighlightToggle(props) {
  return _react["default"].createElement(_theming.ThemeProvider, {
    theme: (0, _theming.convert)(_theming.themes.normal)
  }, _react["default"].createElement(_HighlightToggle["default"], props));
}

describe('HighlightToggle component', function () {
  test('should render', function () {
    // given
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_reactRedux.Provider, {
      store: _reduxConfig["default"]
    }, _react["default"].createElement(ThemedHighlightToggle, null))); // then

    expect(wrapper.exists()).toBe(true);
  });
  test('should match snapshot', function () {
    // given
    var wrapper = (0, _enzyme.mount)(_react["default"].createElement(_reactRedux.Provider, {
      store: _reduxConfig["default"]
    }, _react["default"].createElement(ThemedHighlightToggle, null))); // then

    expect(wrapper).toMatchSnapshot();
  });
});