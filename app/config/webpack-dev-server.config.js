var webpack = require('webpack');
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
    'Access-Control-Allow-Headers': 'X-Requested-With'
  }
}).listen(webpackPort, 'localhost', function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`webpack dev server listening on localhost:${webpackPort}`);
});
