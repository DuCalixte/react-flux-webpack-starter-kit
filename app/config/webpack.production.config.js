const Webpack = require('webpack');
const config = require('./webpack.base.config.js');

config.module.loaders.push(
  {
    test: /.jsx?$/,
    exclude: /node-modules/,
    loader: 'babel-loader',
  },
);

config.plugins.push(
  new Webpack.NoErrorsPlugin(),
  new Webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    },
  }),
);

module.exports = config;
