"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var ts_config_1 = __importDefault(require("./ts_config"));
var create_fork_ts_checker_plugin_1 = __importDefault(require("./create-fork-ts-checker-plugin"));
function webpack(config, _a) {
    var configDir = _a.configDir;
    var tsLoaderOptions = ts_config_1.default(configDir);
    return __assign({}, config, { module: __assign({}, config.module, { rules: config.module.rules.concat([
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: require.resolve('ts-loader'),
                            options: tsLoaderOptions,
                        },
                        require.resolve('angular2-template-loader'),
                    ],
                },
                {
                    test: /[/\\]@angular[/\\]core[/\\].+\.js$/,
                    parser: { system: true },
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader',
                    exclude: /\.async\.html$/,
                },
                {
                    test: /\.s(c|a)ss$/,
                    use: [
                        require.resolve('raw-loader'),
                        {
                            loader: require.resolve('postcss-loader'),
                            options: {
                                plugins: [autoprefixer_1.default()],
                            },
                        },
                        require.resolve('sass-loader'),
                    ],
                },
            ]) }), resolve: __assign({}, config.resolve, { extensions: ['.ts', '.tsx'].concat(config.resolve.extensions) }), plugins: config.plugins.concat([
            // See https://github.com/angular/angular/issues/11580#issuecomment-401127742
            new webpack_1.ContextReplacementPlugin(/@angular(\\|\/)core(\\|\/)(fesm5|bundles)/, path_1.default.resolve(__dirname, '..')),
            create_fork_ts_checker_plugin_1.default(tsLoaderOptions),
        ]) });
}
exports.webpack = webpack;
