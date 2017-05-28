const Webpack = require('webpack');
const config = require('./webpack.base.config.js');
const {resolve} = require('path');

const appOid = (process.env && process.env.APP_OID) || 'productionApp';
// config.output = {
//   path: resolve(__dirname, '../..', `public/${appOid}/app`),
//   filename: '[name]-spa-compiled.js'
// };

config.plugins.push(
  new Webpack.NoEmitOnErrorsPlugin(),
  new Webpack.optimize.UglifyJsPlugin({ sourceMap: true, minimize: true, beautify: false, comments: false }),
  new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
    HOST: JSON.stringify(process.env.HOST || 'localhost'),
  }
}), new Webpack.LoaderOptionsPlugin({minimize: true, debug: false}));

module.exports = config;
