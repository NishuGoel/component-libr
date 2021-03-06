"use strict";

require("core-js/modules/es.array.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _webpack = _interopRequireWildcard(require("webpack"));

var _dotenvWebpack = _interopRequireDefault(require("dotenv-webpack"));

var _htmlWebpackPlugin = _interopRequireDefault(require("html-webpack-plugin"));

var _caseSensitivePathsWebpackPlugin = _interopRequireDefault(require("case-sensitive-paths-webpack-plugin"));

var _corejsUpgradeWebpackPlugin = _interopRequireDefault(require("corejs-upgrade-webpack-plugin"));

var _paths = _interopRequireDefault(require("@storybook/theming/paths"));

var _paths2 = _interopRequireDefault(require("@storybook/ui/paths"));

var _findCacheDir = _interopRequireDefault(require("find-cache-dir"));

var _package = require("../../../package.json");

var _template = require("../utils/template");

var _utils = require("../config/utils");

var _babelLoader = _interopRequireDefault(require("../common/babel-loader"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const coreDirName = _path.default.dirname(require.resolve('@storybook/core/package.json'));

const context = _path.default.join(coreDirName, '../../node_modules');

const cacheDir = (0, _findCacheDir.default)({
  name: 'storybook'
});

var _default = ({
  configDir,
  configType,
  docsMode,
  entries,
  dll,
  outputDir,
  cache,
  babelOptions,
  previewUrl
}) => {
  const {
    raw,
    stringified
  } = (0, _utils.loadEnv)();
  const isProd = configType === 'PRODUCTION';
  return {
    name: 'manager',
    mode: isProd ? 'production' : 'development',
    bail: isProd,
    devtool: 'none',
    entry: entries,
    output: {
      path: outputDir,
      filename: '[name].[chunkhash].bundle.js',
      publicPath: ''
    },
    cache,
    plugins: [dll ? new _webpack.default.DllReferencePlugin({
      context,
      manifest: _path.default.join(__dirname, '../../../dll/storybook_ui-manifest.json')
    }) : null, new _htmlWebpackPlugin.default({
      filename: `index.html`,
      chunksSortMode: 'none',
      alwaysWriteToDisk: true,
      inject: false,
      templateParameters: (compilation, files, options) => ({
        compilation,
        files,
        options,
        version: _package.version,
        dlls: dll ? ['./sb_dll/storybook_ui_dll.js'] : [],
        headHtmlSnippet: (0, _template.getManagerHeadHtml)(configDir, process.env)
      }),
      template: require.resolve(`../templates/index.ejs`)
    }), new _caseSensitivePathsWebpackPlugin.default(), new _dotenvWebpack.default({
      silent: true
    }), // graphql sources check process variable
    new _webpack.DefinePlugin({
      'process.env': stringified,
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      DOCS_MODE: JSON.stringify(docsMode),
      // global docs mode
      PREVIEW_URL: JSON.stringify(previewUrl) // global preview URL

    }), // See https://github.com/graphql/graphql-language-service/issues/111#issuecomment-306723400
    new _webpack.ContextReplacementPlugin(/graphql-language-service-interface[/\\]dist/, /\.js$/), new _corejsUpgradeWebpackPlugin.default({
      resolveFrom: __dirname
    })].filter(Boolean),
    module: {
      rules: [(0, _babelLoader.default)(babelOptions), {
        test: /\.css$/,
        use: [require.resolve('style-loader'), {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1
          }
        }]
      }, {
        test: /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/,
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }, {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: require.resolve('url-loader'),
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }]
    },
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.json'],
      modules: ['node_modules'].concat(raw.NODE_PATH || []),
      alias: _objectSpread({}, _paths.default, {}, _paths2.default)
    },
    recordsPath: _path.default.join(cacheDir, 'records.json'),
    performance: {
      hints: false
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      runtimeChunk: true
    }
  };
};

exports.default = _default;