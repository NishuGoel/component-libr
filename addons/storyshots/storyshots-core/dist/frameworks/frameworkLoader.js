"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require,import/no-dynamic-require */
const loaderScriptName = 'loader.js';

const isDirectory = source => _fs.default.lstatSync(source).isDirectory();

function getLoaders() {
  return _fs.default.readdirSync(__dirname).map(name => _path.default.join(__dirname, name)).filter(isDirectory).map(framework => _path.default.join(framework, loaderScriptName)).filter(_fs.default.existsSync).map(loader => require(loader).default);
}

function loadFramework(options) {
  const loaders = getLoaders();
  const loader = loaders.find(frameworkLoader => frameworkLoader.test(options));

  if (!loader) {
    throw new Error("Couldn't find an appropriate framework loader -- do you need to set the `frameowrk` option?");
  }

  return loader.load(options);
}

var _default = loadFramework;
exports.default = _default;