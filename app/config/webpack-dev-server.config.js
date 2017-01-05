
var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var path = require('path');
var port = process.env.PORT || '8080';

new WebpackDevServer(webpack(webpackConfig), {
	compress: true,
	stats: {
    colors: true
 },
	historyApiFallback: false,
	headers: {
		'Access-Control-Allow-Origin': `http://localhost:${port}`,
		'Access-Control-Allow-Headers': 'X-Requested-With'
	}
}).listen(port);
