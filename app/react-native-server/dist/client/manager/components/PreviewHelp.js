"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var styles = {
  main: {
    margin: 15,
    maxWidth: 600,
    lineHeight: 1.4,
    fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif'
  },
  code: {
    fontSize: 15,
    fontWeight: 600,
    padding: '2px 5px',
    border: '1px solid #eae9e9',
    borderRadius: 4,
    backgroundColor: '#f3f2f2',
    color: '#3a3a3a'
  },
  codeBlock: {
    backgroundColor: '#f3f2f2',
    padding: '1px 10px',
    margin: '10px 0'
  }
};

var PreviewHelp = function PreviewHelp() {
  return _react["default"].createElement("div", {
    style: styles.main
  }, _react["default"].createElement("h1", null, "Welcome to storybook"), _react["default"].createElement("p", null, "This is a UI component dev environment for your app."), _react["default"].createElement("p", null, "We've added some basic stories inside the ", _react["default"].createElement("span", {
    style: styles.code
  }, "storybook/stories"), ' ', "directory. A story is a single state of one or more UI components. You can have as many stories as you want. Basically a story is like a visual test case."), _react["default"].createElement("p", null, "To see your Storybook stories on the device, you should start your mobile app for the", ' ', _react["default"].createElement("span", {
    style: styles.code
  }, "<platform>"), " of your choice (typically ios or android). (Note that due to an implementation detail, your stories will only show up in the left-pane after your device has connected to this storybook server.)"), _react["default"].createElement("p", null, "For ", _react["default"].createElement("span", {
    style: styles.code
  }, "create-react-native-app"), " apps:"), _react["default"].createElement("div", {
    style: styles.codeBlock
  }, _react["default"].createElement("pre", {
    style: styles.instructionsCode
  }, "npm run <platform>")), _react["default"].createElement("p", null, "For ", _react["default"].createElement("span", {
    style: styles.code
  }, "react-native init"), " apps:"), _react["default"].createElement("div", {
    style: styles.codeBlock
  }, _react["default"].createElement("pre", {
    style: styles.instructionsCode
  }, "react-native run-<platform>")));
};

exports["default"] = PreviewHelp;