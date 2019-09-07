"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-destructuring */
var client_1 = require("@storybook/core/client");
require("./globals");
var render_1 = __importDefault(require("./render"));
var framework = 'angular';
var api = client_1.start(render_1.default);
exports.storiesOf = function (kind, m) {
    return api.clientApi.storiesOf(kind, m).addParameters({
        framework: framework,
    });
};
exports.load = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return api.load.apply(api, args.concat([framework]));
};
exports.addDecorator = api.clientApi.addDecorator;
exports.addParameters = api.clientApi.addParameters;
exports.clearDecorators = api.clientApi.clearDecorators;
exports.setAddon = api.clientApi.setAddon;
exports.configure = api.configApi.configure;
exports.forceReRender = api.forceReRender;
exports.getStorybook = api.clientApi.getStorybook;
exports.raw = api.clientApi.raw;
