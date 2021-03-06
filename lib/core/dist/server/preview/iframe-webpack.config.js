"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = require("webpack");

var _dotenvWebpack = _interopRequireDefault(require("dotenv-webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _caseSensitivePathsWebpackPlugin = _interopRequireDefault(require("case-sensitive-paths-webpack-plugin"));

var _WatchMissingNodeModulesPlugin = _interopRequireDefault(require("react-dev-utils/WatchMissingNodeModulesPlugin"));

var _terserWebpackPlugin = _interopRequireDefault(require("terser-webpack-plugin"));

var _corejsUpgradeWebpackPlugin = _interopRequireDefault(require("corejs-upgrade-webpack-plugin"));

var _resolveFrom = _interopRequireDefault(require("resolve-from"));

var _babelLoader = _interopRequireDefault(require("../common/babel-loader"));

var _utils = require("../config/utils");

var _template = require("../utils/template");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const reactPaths = {};

try {
  reactPaths.react = _path.default.dirname((0, _resolveFrom.default)(process.cwd(), 'react/package.json'));
  reactPaths['react-dom'] = _path.default.dirname((0, _resolveFrom.default)(process.cwd(), 'react-dom/package.json'));
} catch (e) {//
}

var _default = ({
  configDir,
  babelOptions,
  entries,
  outputDir = _path.default.join('.', 'public'),
  quiet,
  packageJson,
  configType
}) => {
  const {
    raw,
    stringified
  } = (0, _utils.loadEnv)({
    production: true
  });
  const isProd = configType === 'PRODUCTION';
  return {
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: '#cheap-module-source-map',
    entry: entries,
    output: {
      path: _path.default.resolve(process.cwd(), outputDir),
      filename: '[name].[hash].bundle.js',
      publicPath: ''
    },
    plugins: [new _htmlWebpackPlugin.default({
      filename: `iframe.html`,
      chunksSortMode: 'none',
      alwaysWriteToDisk: true,
      inject: false,
      templateParameters: (compilation, files, options) => ({
        compilation,
        files,
        options,
        version: packageJson.version,
        headHtmlSnippet: (0, _template.getPreviewHeadHtml)(configDir, process.env),
        dlls: [],
        bodyHtmlSnippet: (0, _template.getPreviewBodyHtml)()
      }),
      template: require.resolve(`../templates/index.ejs`)
    }), new _webpack.DefinePlugin({
      'process.env': stringified,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }), isProd ? null : new _WatchMissingNodeModulesPlugin.default(_utils.nodeModulesPaths), isProd ? null : new _webpack.HotModuleReplacementPlugin(), new _caseSensitivePathsWebpackPlugin.default(), quiet ? null : new _webpack.ProgressPlugin(), new _dotenvWebpack.default({
      silent: true
    }), new _corejsUpgradeWebpackPlugin.default({
      resolveFrom: __dirname
    })].filter(Boolean),
    module: {
      rules: [(0, _babelLoader.default)(babelOptions), {
        test: /\.md$/,
        use: [{
          loader: require.resolve('raw-loader')
        }]
      }]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json'],
      modules: ['node_modules'].concat(raw.NODE_PATH || []),
      alias: _objectSpread({
        'babel-runtime/core-js/object/assign': require.resolve('core-js/es/object/assign')
      }, reactPaths)
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true,
      minimizer: [new _terserWebpackPlugin.default({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          mangle: false,
          keep_fnames: true
        }
      })]
    },
    performance: {
      hints: isProd ? 'warning' : false
    }
  };
};

exports.default = _default;