require('es6-promise').polyfill();
var path = require('path');

require('./bootstrap.config.js');
require('./font-awesome.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var port = process.env.PORT || '9080';

module.exports = {
	entry: {
		app : [path.resolve(__dirname, '../Routes.jsx')],
		bootstrap: 'bootstrap-loader',
		'font-awesome': 'font-awesome-loader'
	},
	vendor: [
		'alt', 'babel-polyfill', 'classnames', 'bootstrap-sass', 'font-awesome',
		'es6-promise', 'lodash', 'react', 'react-dom', 'react-router', 'react-bootstrap', 'superagent'
	],
	output: {
		path: path.join(__dirname, '../..', 'public/app'),
    filename: "index.js"
	},
	externals: {
		'jQuery': 'jquery'
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			exclude: /node-modules/,
			loader: 'babel-loader'
		}, {
        test: /\.json$/,
        loader: 'json'
      },{
			test: /\.s?css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&minify&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader')
		}, {
			test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]&publicPath=../../public/app/'
		}, {
			test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]&publicPath=../../public/app/'
		}, {
			test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]&publicPath=../../public/app/'
		}, {
			test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]&publicPath=../../public/app/'
		}, {
			test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]&publicPath=../../public/app/'
		}]
	},
	postcss: [require('autoprefixer')],
	devtool: 'cheap-module-source-map',
	// devtool: 'inline-sourcemap',
	plugins: [
		new Webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('styles.css', {
			allChunks: true
		}),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        PORT: JSON.stringify(process.env.PORT || '9090'),
        WEBPACK_PORT: JSON.stringify(process.env.WEBPACK_PORT || '9191')
      }
    }),
		new Webpack.optimize.CommonsChunkPlugin({
			name: 'bootstrap',
			chunks: ['bootstrap'],
			filename: "bootstrap-loader.js"
		}),
		new Webpack.optimize.CommonsChunkPlugin({
			name: 'font-awesome',
			chunks: ['font-awesome'],
			filename: 'font-awesome-loader.js'
		}),
		new Webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: "bundle.vendor.js"
		}),
		new Webpack.ProvidePlugin({
			React: 'react',
			_: 'lodash',
			classnames: 'classnames',
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
	resolve: {
		extensions: ['', '.jsx', '.js'],
		alias: {
			actions: path.join(__dirname, '../../actions'),
			components: path.join(__dirname, '../../components'),
			views: path.join(__dirname, '../../components/views'),
			controllers: path.join(__dirname, '../../controllers'),
			stores: path.join(__dirname, '../../stores'),
			utilities: path.join(__dirname, '../../utilities')
		}
	}
};
