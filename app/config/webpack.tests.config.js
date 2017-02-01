var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var config = require('./webpack.base.config.js');

config.devtool = 'inline-source-map';


config.plugins.push(
  new Webpack.ProvidePlugin({
    ReactDOM: 'react-dom',
    ReactTestUtils: 'react-addons-test-utils',
  })
);

config.module.loaders[3] = {
  test: /\.s?css$/,
  exclude: /node_modules/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&minify&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'),
};

config.vendor.push('sinon', 'enzyme');

config.externals = {
  jsdom: 'window',
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': 'window',
  'react/lib/ReactContext': 'window',
};

module.exports = config;
