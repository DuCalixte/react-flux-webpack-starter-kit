var Webpack = require('webpack');

var config = require('./webpack.base.config.js');

var webpackPort = process.env.WEBPACK_PORT || '8090';

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${webpackPort}`, 'webpack/hot/dev-server');
// You could also use 'webpack/hot/only-dev-server' instead of
// 'webpack/hot/dev-server' to keep view when error occurs.

config.target = 'node';
config.output.publicPath = `//localhost:${webpackPort}/public/app/`;

config.plugins.push(new Webpack.HotModuleReplacementPlugin());

module.exports = config;
