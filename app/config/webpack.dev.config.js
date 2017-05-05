const Webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./webpack.base.config.js');

const { resolve } = require('path');
const appOid = (process.env && process.env.APP_OID) || 'productionApp';
const port = (process.env && process.env.PORT) || 8080;

config.devServer = {
	hot: true,
  compress: true,
  stats: 'errors-only',
	publicPath: '/public/app/',
  port,
	quiet: true,
  noInfo: true,
  hot: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': `http://localhost:${port}`,
    'Access-Control-Allow-Headers': 'X-Requested-With',
  }
};

config.plugins.push(new Webpack.HotModuleReplacementPlugin());
config.plugins.push(new Webpack.NamedModulesPlugin());
config.plugins.push(new Webpack.NoEmitOnErrorsPlugin());

if (process.env.NOTIFY === 'prompt') {
	const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

	config.plugins.push(new WebpackBuildNotifierPlugin({title: appOid, sound: 'Pop', failureSound: 'Sosumi'}));
} else if (process.env.NOTIFY === 'dashboard') {
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');

  config.plugins.push(new DashboardPlugin((new Dashboard({title: appOid, color: 'cyan'})).setData));
}
module.exports = config;
