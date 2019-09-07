"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChannel = void 0;

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var useChannel = function useChannel(event, eventHandler) {
  var inputs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  return (0, _react.useEffect)(function () {
    var channel = _addons["default"].getChannel();

    channel.on(event, eventHandler);
    return function () {
      return channel.removeListener(event, eventHandler);
    };
  }, inputs);
};

exports.useChannel = useChannel;