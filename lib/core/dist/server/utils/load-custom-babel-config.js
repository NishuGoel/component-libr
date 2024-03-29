"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _json = _interopRequireDefault(require("json5"));

var _semver = require("semver");

var _resolve = require("resolve");

var _nodeLogger = require("@storybook/node-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function removeReactHmre(presets) {
  const index = presets.indexOf('react-hmre');

  if (index > -1) {
    presets.splice(index, 1);
  }
} // Tries to load a .babelrc and returns the parsed object if successful


function loadFromPath(babelConfigPath) {
  let config;
  const error = {};

  if (_fs.default.existsSync(babelConfigPath)) {
    const content = _fs.default.readFileSync(babelConfigPath, 'utf-8');

    try {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      config = require(babelConfigPath);

      _nodeLogger.logger.info('=> Loading custom babel config as JS');
    } catch (e) {
      error.js = e;
    }

    try {
      config = _json.default.parse(content);

      _nodeLogger.logger.info('=> Loading custom babel config');
    } catch (e) {
      error.json = e;
    }

    if (!config) {
      _nodeLogger.logger.error(`=> Error parsing babel config file: ${babelConfigPath}
      
      We tried both loading as JS & JSON, neither worked.
      Maybe there's a syntax error in the file?`);

      _nodeLogger.logger.error(`=> From JS loading we got: ${error.js.message}`);

      _nodeLogger.logger.error(`=> From JSON loading we got: ${error.json && error.json.message}`);

      throw error.js;
    }

    config = _objectSpread({}, config, {
      babelrc: false
    });
  }

  if (!config) return null; // Remove react-hmre preset.
  // It causes issues with react-storybook.
  // We don't really need it.
  // Earlier, we fix this by running storybook in the production mode.
  // But, that hide some useful debug messages.

  if (config.presets) {
    removeReactHmre(config.presets);
  }

  if (config.env && config.env.development && config.env.development.presets) {
    removeReactHmre(config.env.development.presets);
  }

  return config;
}

function isBabelLoader8() {
  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const babelLoaderPkg = require((0, _resolve.sync)('babel-loader/package.json', {
      basedir: process.cwd()
    }));

    return (0, _semver.satisfies)(babelLoaderPkg.version, '>=8.0.0-0');
  } catch (e) {
    return false;
  }
}

async function _default(configDir, getDefaultConfig) {
  const projectRoot = process.cwd();
  const babelConfig = loadFromPath(_path.default.resolve(configDir, '.babelrc')) || loadFromPath(_path.default.resolve(projectRoot, 'babel.config.js'));

  if (babelConfig) {
    // If the custom config uses babel's `extends` clause, then replace it with
    // an absolute path. `extends` will not work unless we do this.
    if (babelConfig.extends) {
      babelConfig.extends = _path.default.resolve(configDir, babelConfig.extends);
    }

    return babelConfig;
  }

  return isBabelLoader8() ? getDefaultConfig() : {};
}