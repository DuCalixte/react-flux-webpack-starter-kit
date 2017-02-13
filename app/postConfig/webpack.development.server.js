/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */

var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.dev.config.js');

var __port__ = parseInt(process.env.PORT);
var __webpack_port__ = parseInt(process.env.WEBPACK_PORT);
// console.log('__port__', __port__);
// console.log('process.env', process.env);
new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/public/app/',
  inline: true,
  hot: true,
  stats: 'errors-only',
  historyApiFallback: true,
  port: __port__,
  headers: {
    'Access-Control-Allow-Origin': `http://localhost:${__port__}`,
    'Access-Control-Allow-Headers': 'X-Requested-With',
  },
}).listen(__webpack_port__, 'localhost', (err) => {
  if (err) {
    console.error(err);
  }
  console.warn(`webpack dev server listening on localhost:${__webpack_port__}`);
});
