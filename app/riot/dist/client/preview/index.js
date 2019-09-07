"use strict";

require("core-js/modules/es.array.concat");

require("core-js/modules/es.function.bind");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.get-own-property-descriptor");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "tag", {
  enumerable: true,
  get: function get() {
    return _riot.tag2;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function get() {
    return _render["default"];
  }
});
Object.defineProperty(exports, "asCompiledCode", {
  enumerable: true,
  get: function get() {
    return _compileStageFunctions.asCompiledCode;
  }
});
exports.compileNow = exports.mount = exports.forceReRender = exports.configure = exports.load = exports.storiesOf = exports.raw = exports.getStorybook = exports.clearDecorators = exports.addParameters = exports.addDecorator = exports.setAddon = void 0;

var _client = require("@storybook/core/client");

require("./globals");

var _riot = _interopRequireWildcard(require("riot"));

var _render = _interopRequireDefault(require("./render"));

var _compileStageFunctions = require("./compileStageFunctions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var _start = (0, _client.start)(_render["default"]),
    coreLoad = _start.load,
    clientApi = _start.clientApi,
    configApi = _start.configApi,
    forceReRender = _start.forceReRender;

exports.forceReRender = forceReRender;
var setAddon = clientApi.setAddon,
    addDecorator = clientApi.addDecorator,
    addParameters = clientApi.addParameters,
    clearDecorators = clientApi.clearDecorators,
    getStorybook = clientApi.getStorybook,
    raw = clientApi.raw;
exports.raw = raw;
exports.getStorybook = getStorybook;
exports.clearDecorators = clearDecorators;
exports.addParameters = addParameters;
exports.addDecorator = addDecorator;
exports.setAddon = setAddon;
var framework = 'riot';

var storiesOf = function storiesOf() {
  return clientApi.storiesOf.apply(clientApi, arguments).addParameters({
    framework: framework
  });
};

exports.storiesOf = storiesOf;

var load = function load() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return coreLoad.apply(void 0, args.concat([framework]));
};

exports.load = load;
var configure = configApi.configure;
exports.configure = configure;

var mount = _riot.mount.bind(_riot["default"], '#root');

exports.mount = mount;

var compileNow = _compileStageFunctions.compileNow.bind(null, _riot.tag2);

exports.compileNow = compileNow;