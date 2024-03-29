"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReactScriptsPath = getReactScriptsPath;
exports.isReactScriptsInstalled = isReactScriptsInstalled;
exports.getCraWebpackConfig = getCraWebpackConfig;
exports.applyCRAWebpackConfig = applyCRAWebpackConfig;
exports.getModulePath = exports.getTypeScriptRules = exports.getRules = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _semver = _interopRequireDefault(require("semver"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

var _RuleSet = require("webpack/lib/RuleSet");

var _nodeLogger = require("@storybook/node-logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const JSCONFIG = 'jsconfig.json';
const TSCONFIG = 'tsconfig.json';

const appDirectory = _fs.default.realpathSync(process.cwd());

const cssExtensions = ['.css', '.scss', '.sass'];
const cssModuleExtensions = ['.module.css', '.module.scss', '.module.sass'];
const typeScriptExtensions = ['.ts', '.tsx'];
let reactScriptsPath;

function getReactScriptsPath({
  noCache
} = {}) {
  if (reactScriptsPath && !noCache) return reactScriptsPath;

  let reactScriptsScriptPath = _fs.default.realpathSync(_path.default.join(appDirectory, '/node_modules/.bin/react-scripts'));

  try {
    // Note: Since there is no symlink for .bin/react-scripts on Windows
    // we'll parse react-scripts file to find actual package path.
    // This is important if you use fork of CRA.
    const pathIsNotResolved = /node_modules[\\/]\.bin[\\/]react-scripts/i.test(reactScriptsScriptPath);

    if (pathIsNotResolved) {
      const content = _fs.default.readFileSync(reactScriptsScriptPath, 'utf8');

      const packagePathMatch = content.match(/"\$basedir[\\/]([^\s]+?[\\/]bin[\\/]react-scripts\.js")/i);

      if (packagePathMatch && packagePathMatch.length > 1) {
        reactScriptsScriptPath = _path.default.join(appDirectory, '/node_modules/.bin/', packagePathMatch[1]);
      }
    }
  } catch (e) {
    _nodeLogger.logger.warn(`Error occured during react-scripts package path resolving: ${e}`);
  }

  reactScriptsPath = _path.default.join(reactScriptsScriptPath, '../..');

  const scriptsPkgJson = _path.default.join(reactScriptsPath, 'package.json');

  if (!_fs.default.existsSync(scriptsPkgJson)) {
    reactScriptsPath = 'react-scripts';
  }

  return reactScriptsPath;
}

function isReactScriptsInstalled(requiredVersion = '2.0.0') {
  try {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const reactScriptsJson = require(_path.default.join(getReactScriptsPath(), 'package.json'));

    return !_semver.default.gtr(requiredVersion, reactScriptsJson.version);
  } catch (e) {
    return false;
  }
}

const getRules = extensions => rules => rules.reduce((craRules, rule) => {
  // If at least one extension satisfies the rule test, the rule is one
  // we want to extract
  if (rule.test && extensions.some((0, _RuleSet.normalizeCondition)(rule.test))) {
    // If the base test is for extensions, return early
    return craRules.concat(rule);
  } // Get any rules contained in rule.oneOf


  if (!rule.test && rule.oneOf) {
    craRules.push(...getRules(extensions)(rule.oneOf));
  } // Get any rules contained in rule.rules


  if (!rule.test && rule.rules) {
    craRules.push(...getRules(extensions)(rule.rules));
  }

  return craRules;
}, []);

exports.getRules = getRules;
const getStyleRules = getRules(cssExtensions.concat(cssModuleExtensions));

const getTypeScriptRules = (webpackConfigRules, configDir) => {
  const rules = getRules(typeScriptExtensions)(webpackConfigRules); // We know CRA only has one rule targetting TS for now, which is the first rule.

  const babelRule = rules[0]; // Resolves an issue where this config is parsed twice (#4903).

  if (typeof babelRule.include !== 'string') return rules; // Adds support for using TypeScript in the `.storybook` (or config) folder.

  return [_objectSpread({}, babelRule, {
    include: [babelRule.include, _path.default.resolve(configDir)]
  }), ...rules.slice(1)];
};

exports.getTypeScriptRules = getTypeScriptRules;

const getModulePath = () => {
  // As with CRA, we only support `jsconfig.json` if `tsconfig.json` doesn't exist.
  let configName;

  if (_fs.default.existsSync(_path.default.join(appDirectory, TSCONFIG))) {
    configName = TSCONFIG;
  } else if (_fs.default.existsSync(_path.default.join(appDirectory, JSCONFIG))) {
    configName = JSCONFIG;
  }

  if (configName) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    const config = require(_path.default.join(appDirectory, configName));

    return config.compilerOptions && config.compilerOptions.baseUrl;
  }

  return false;
};

exports.getModulePath = getModulePath;

function mergePlugins(basePlugins, additionalPlugins) {
  return [...basePlugins, ...additionalPlugins].reduce((plugins, plugin) => {
    if (plugins.some(includedPlugin => includedPlugin.constructor.name === plugin.constructor.name)) {
      return plugins;
    }

    return [...plugins, plugin];
  }, []);
}

function getCraWebpackConfig(mode) {
  const pathToReactScripts = getReactScriptsPath();
  const craWebpackConfig = mode === 'production' ? 'config/webpack.config.prod.js' : 'config/webpack.config.dev.js';

  let pathToWebpackConfig = _path.default.join(pathToReactScripts, craWebpackConfig);

  if (!_fs.default.existsSync(pathToWebpackConfig)) {
    pathToWebpackConfig = _path.default.join(pathToReactScripts, 'config/webpack.config.js');
  } // eslint-disable-next-line import/no-dynamic-require,global-require


  const webpackConfig = require(pathToWebpackConfig);

  if (typeof webpackConfig === 'function') {
    return webpackConfig(mode);
  }

  return webpackConfig;
}

function applyCRAWebpackConfig(baseConfig, configDir) {
  // Check if the user can use TypeScript (react-scripts version 2.1+).
  const hasTsSupport = isReactScriptsInstalled('2.1.0');
  const tsExtensions = hasTsSupport ? typeScriptExtensions : [];
  const extensions = [...cssExtensions, ...tsExtensions]; // Support for this was added in `react-scripts@3.0.0`.
  // https://github.com/facebook/create-react-app/pull/6656

  const modulePath = isReactScriptsInstalled('3.0.0') && getModulePath(); // Remove any rules from baseConfig that test true for any one of the extensions

  const filteredBaseRules = baseConfig.module.rules.filter(rule => !rule.test || !extensions.some((0, _RuleSet.normalizeCondition)(rule.test))); //  Load create-react-app config

  const craWebpackConfig = getCraWebpackConfig(baseConfig.mode);
  const craStyleRules = getStyleRules(craWebpackConfig.module.rules);
  const craTypeScriptRules = hasTsSupport ? getTypeScriptRules(craWebpackConfig.module.rules, configDir) : []; //  Add css minification for production

  const plugins = [...baseConfig.plugins];

  if (baseConfig.mode === 'production') {
    plugins.push(new _miniCssExtractPlugin.default());
  }

  return _objectSpread({}, baseConfig, {
    module: _objectSpread({}, baseConfig.module, {
      rules: [...filteredBaseRules, ...craStyleRules, ...craTypeScriptRules]
    }),
    plugins: mergePlugins(plugins, hasTsSupport ? craWebpackConfig.plugins : []),
    resolve: _objectSpread({}, baseConfig.resolve, {
      extensions: [...baseConfig.resolve.extensions, ...tsExtensions],
      modules: baseConfig.resolve.modules.concat(modulePath || [])
    }),
    resolveLoader: {
      modules: ['node_modules', _path.default.join(getReactScriptsPath(), 'node_modules')]
    }
  });
}