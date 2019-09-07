"use strict";

require("core-js/modules/es.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withDecorator = exports.createDecorator = void 0;

var _global = require("global");

var _clientApi = require("@storybook/client-api");

/* eslint-disable no-console */
var root = _global.document && _global.document.getElementById('root');

var createDecorator = function createDecorator() {
  return function (options) {
    return function (storyFn) {
      (0, _clientApi.useEffect)(function () {
        if (root != null) {
          console.log('story was rendered');
          return function () {
            console.log('story was removed');
          };
        }

        return undefined;
      }, [root, options]);
      return storyFn();
    };
  };
};

exports.createDecorator = createDecorator;
var withDecorator = createDecorator();
exports.withDecorator = withDecorator;