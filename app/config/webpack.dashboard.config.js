var Webpack = require('webpack');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

const dashboard = new Dashboard({ title: 'Hello Stanley', color: 'cyan' });
const port = process.env.PORT || '8080';
const webpackPort = process.env.WEBPACK_PORT || '8090';

var config = require('./webpack.base.config.js');

// var webpackPort = process.env.WEBPACK_PORT || '8090';

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${webpackPort}`, 'webpack/hot/dev-server');

config.output.publicPath = `//localhost:${webpackPort}/public/app/`;
config.devtool = 'inline-source-map';

// config.plugins.push(new DashboardPlugin(dashboard.setData));
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
// config.plugins.push(new DashboardPlugin({port: 8080}));
// config.plugins.push(new DashboardPlugin(dashboard.setData));
// config.plugins.push(new DashboardPlugin(() => { return { logFormat: format, port: 8090, log: () => {}, handler: dashboard.setData };}));
// dashboard.setData({type: "clear", value: ""});
config.plugins.push(new DashboardPlugin({ logFormat: format, port: webpackPort, handler: dashboard.setData }));
// config.plugins.push(new DashboardPlugin({port: port, handler: dashboard.setData }));
// config.plugins.push(new DashboardPlugin({ port: 8080, handler: () => {}}));

// config.plugins.push(new DashboardPlugin(dashboard.setData({log: () => {}})));
// config.plugins.push(new DashboardPlugin({ port: 8080, handler: dashboard.setData }));

module.exports = config;
