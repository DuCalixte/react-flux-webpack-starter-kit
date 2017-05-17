const Webpack = require('webpack');

const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const config = require('./webpack.base.config.js');

const dashboard = new Dashboard({ title: 'Hello Stanley', color: 'cyan' });
const webpackPort = process.env.WEBPACK_PORT || '8090';

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${webpackPort}`, 'webpack/hot/dev-server');

config.output.publicPath = `//localhost:${webpackPort}/public/app/`;
config.devtool = 'inline-source-map';

config.plugins.push(new DashboardPlugin(dashboard.setData));
config.plugins.push(new Webpack.NoErrorsPlugin());
config.plugins.push(new Webpack.HotModuleReplacementPlugin());
const format = {
  hash: false,
  version: false,
  timings: false,
  assets: false,
  chunks: false,
  chunkModules: false,
  children: false,
  cached: false,
  reasons: false,
  source: false,
  errorDetails: true,
  chunkOrigins: false,
  colors: true,
  errorsOnly: true,
};

config.plugins.push(new DashboardPlugin({ logFormat: format, port: webpackPort, handler: dashboard.setData }));

module.exports = config;
