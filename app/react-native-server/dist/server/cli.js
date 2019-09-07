"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseList = parseList;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _commander = _interopRequireDefault(require("commander"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function parseList(str) {
  return str.split(',');
}

function getCli() {
  _commander.default.option('-h, --host <host>', 'host to listen on', 'localhost').option('-p, --port <port>', 'port to listen on', 7007).option('-e, --environment [environment]', 'DEVELOPMENT/PRODUCTION environment for webpack').option('-i, --manual-id', 'allow multiple users to work with same storybook').option('-c, --config-dir [dir-name]', 'Directory where to load Storybook configurations from').option('--https', 'Serve Storybook over HTTPS. Note: You must provide your own certificate information.').option('--ssl-ca <ca>', 'Provide an SSL certificate authority. (Optional with --https, required if using a self-signed certificate)', parseList).option('--ssl-cert <cert>', 'Provide an SSL certificate. (Required with --https)').option('--ssl-key <key>', 'Provide an SSL key. (Required with --https)').option('--smoke-test', 'Exit after successful start').option('--ci', "CI mode (skip interactive prompts, don't open browser").option('--quiet', 'Suppress verbose build output').parse(process.argv);

  const configDir = _path.default.resolve(_commander.default.configDir || './storybook');

  return _objectSpread({}, _commander.default, {
    configDir
  });
}

var _default = getCli;
exports.default = _default;