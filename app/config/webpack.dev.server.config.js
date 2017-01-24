var webpack = require('webpack');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config.js');

var port = process.env.PORT || '8080';
var webpackPort = process.env.WEBPACK_PORT || '8090';

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/public/app/',
  inline: true,
  hot: true,
  stats: 'errors-only',
  colors: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': `http://localhost:${port}`,
    'Access-Control-Allow-Headers': 'X-Requested-With',
  },
}).listen(webpackPort, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.warn(`webpack dev server listening on localhost:${webpackPort}`);
});
