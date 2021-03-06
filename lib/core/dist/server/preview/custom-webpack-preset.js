"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.webpack = webpack;

var _utilDeprecate = _interopRequireDefault(require("util-deprecate"));

var _commonTags = require("common-tags");

var _nodeLogger = require("@storybook/node-logger");

var _loadCustomWebpackConfig = _interopRequireDefault(require("../utils/load-custom-webpack-config"));

var _mergeWebpackConfig = _interopRequireDefault(require("../utils/merge-webpack-config"));

var _baseWebpack = require("./base-webpack.config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createFinalDefaultConfig(presets, config, options) {
  const defaultConfig = (0, _baseWebpack.createDefaultWebpackConfig)(config);
  return presets.apply('webpackFinal', defaultConfig, options);
}

async function webpack(config, options) {
  const {
    configDir,
    configType,
    presets,
    webpackConfig
  } = options; // through standalone webpackConfig option

  if (webpackConfig) {
    const finalDefaultConfig = await createFinalDefaultConfig(presets, config, options);
    return webpackConfig(finalDefaultConfig);
  } // Check whether user has a custom webpack config file and
  // return the (extended) base configuration if it's not available.


  const customConfig = (0, _loadCustomWebpackConfig.default)(configDir);

  if (customConfig === null) {
    _nodeLogger.logger.info('=> Using default webpack setup.');

    return createFinalDefaultConfig(presets, config, options);
  }

  if (typeof customConfig === 'function') {
    _nodeLogger.logger.info('=> Loading custom webpack config (full-control mode).');

    const finalDefaultConfig = await createFinalDefaultConfig(presets, config, options);
    return customConfig({
      config: finalDefaultConfig,
      mode: configType
    });
  }

  _nodeLogger.logger.info('=> Loading custom webpack config (extending mode).'); // Restore 4.x behavior, but deprecate this mode of extending webpack


  const finalConfig = await presets.apply('webpackFinal', config, options);
  return (0, _utilDeprecate.default)(() => (0, _mergeWebpackConfig.default)(finalConfig, customConfig), _commonTags.stripIndents`
      Extend-mode configuration is deprecated, please use full-control mode instead.
      
      See https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode
    `)();
}