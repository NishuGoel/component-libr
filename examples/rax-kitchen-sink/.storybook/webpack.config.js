const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: [/\.stories\.js$/, /index\.js$/],
        loaders: [require.resolve('@storybook/source-loader')],
        include: [path.resolve(__dirname, '../src')],
        enforce: 'pre',
      },
      {
        test: /\.stylesheet$/,
        use: [require.resolve('stylesheet-loader')],
      },
    ],
  },
};
