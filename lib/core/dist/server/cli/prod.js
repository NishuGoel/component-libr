"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _commander = _interopRequireDefault(require("commander"));

var _chalk = _interopRequireDefault(require("chalk"));

var _nodeLogger = require("@storybook/node-logger");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCLI(packageJson) {
  process.env.NODE_ENV = process.env.NODE_ENV || 'production';

  _commander.default.version(packageJson.version).option('-s, --static-dir <dir-names>', 'Directory where to load static files from', _utils.parseList).option('-o, --output-dir [dir-name]', 'Directory where to store built files').option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from').option('-w, --watch', 'Enable watch mode').option('--quiet', 'Suppress verbose build output').option('--loglevel [level]', 'Control level of logging during build').option('--no-dll', 'Do not use dll reference').option('--debug-webpack', 'Display final webpack configurations for debugging purposes').option('--preview-url [string]', 'Disables the default storybook preview and lets your use your own').option('--docs', 'Build a documentation-only site using addon-docs').parse(process.argv);

  _nodeLogger.logger.setLevel(_commander.default.loglevel);

  _nodeLogger.logger.info(_chalk.default.bold(`${packageJson.name} v${packageJson.version}\n`)); // The key is the field created in `program` variable for
  // each command line argument. Value is the env variable.


  (0, _utils.getEnvConfig)(_commander.default, {
    staticDir: 'SBCONFIG_STATIC_DIR',
    outputDir: 'SBCONFIG_OUTPUT_DIR',
    configDir: 'SBCONFIG_CONFIG_DIR'
  });
  return _objectSpread({}, _commander.default);
}

var _default = getCLI;
exports.default = _default;