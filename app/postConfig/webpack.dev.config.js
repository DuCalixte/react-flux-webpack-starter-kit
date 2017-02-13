var Webpack = require('webpack');

var config = require('./webpack.base.config.js');

// var webpackPort = process.env.WEBPACK_PORT || '8090';
var __webpack_port__ = parseInt(process.env.WEBPACK_PORT);

config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${__webpack_port__}`, 'webpack/hot/dev-server');

config.output.publicPath = `//localhost:${__webpack_port__}/public/app/`;

config.plugins.push(new Webpack.HotModuleReplacementPlugin());
config.plugins.push(new Webpack.NamedModulesPlugin());

module.exports = config;
