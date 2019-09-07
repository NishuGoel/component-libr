"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withRoundtrip = void 0;

var _clientApi = require("@storybook/client-api");

var _constants = require("./constants");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withRoundtrip = function withRoundtrip(storyFn) {
  var emit = (0, _clientApi.useChannel)(_defineProperty({}, _constants.EVENTS.REQUEST, function () {
    emit(_constants.EVENTS.RESULT, ['from the preview']);
  }));
  return storyFn();
};

exports.withRoundtrip = withRoundtrip;