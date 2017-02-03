var Webpack = require('webpack');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');

const dashboard = new Dashboard();

var config = require('./webpack.base.config.js');

var webpackPort = process.env.WEBPACK_PORT || '8090';

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${webpackPort}`, 'webpack/hot/dev-server');

config.output.publicPath = `//localhost:${webpackPort}/public/app/`;
config.devtool = 'inline-source-map';

config.plugins.push(new Webpack.NoErrorsPlugin());
config.plugins.push(new Webpack.HotModuleReplacementPlugin());
config.plugins.push(new DashboardPlugin(dashboard.setData));

module.exports = config;
