const Webpack = require('webpack');
const config = require('./webpack.base.config.js');

config.devtool = 'inline-source-map';

config.plugins.push(
  new Webpack.ProvidePlugin({
    ReactTestUtils: 'react-addons-test-utils',
  })
);


config.externals = {
  jsdom: 'window',
  cheerio: 'window',
  'react/addons': true,
  'react/lib/ExecutionEnvironment': 'window',
  'react/lib/ReactContext': 'window',
};

module.exports = config;
