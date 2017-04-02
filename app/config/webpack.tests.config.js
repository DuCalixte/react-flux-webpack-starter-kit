var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.devtool = 'inline-source-map';


config.plugins.push(
  new Webpack.ProvidePlugin({
    ReactDOM: 'react-dom',
    ReactTestUtils: 'react-addons-test-utils',
  }),
);

for (var index in config.module.loaders) {
  Object.assign(config.module.loaders[index], { exclude: /node-modules/ });
}

config.vendor.push('sinon', 'enzyme');

config.externals = {
  jsdom: 'window',
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': 'window',
  'react/lib/ReactContext': 'window',
};

module.exports = config;
