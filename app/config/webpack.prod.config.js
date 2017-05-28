const Webpack = require('webpack');
const config = require('./webpack.base.config.js');
const {resolve} = require('path');

config.plugins.push(
  new Webpack.NoEmitOnErrorsPlugin(),
  new Webpack.optimize.UglifyJsPlugin({ sourceMap: true, minimize: true, beautify: false, comments: false }),
  new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    HOST: JSON.stringify(process.env.HOST || 'localhost'),
    PORT: JSON.stringify(process.env.PORT || 3000),
  }
}), new Webpack.LoaderOptionsPlugin({minimize: true, debug: false}));

module.exports = config;
