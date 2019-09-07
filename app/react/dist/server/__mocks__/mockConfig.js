"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class BaseTestPlugin1 {}

class BaseTestPlugin2 {}

var _default = {
  devtool: 'cheap-eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      baseAlias: 'base-alias'
    },
    modules: []
  },
  module: {
    noParse: /jquery/,
    rules: [{
      test: /\.js$/,
      include: 'app/baseSrc',
      loader: 'babel-loader',
      options: {}
    }]
  },
  plugins: [new BaseTestPlugin1(), new BaseTestPlugin2()]
};
exports.default = _default;