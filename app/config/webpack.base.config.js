const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Webpack = require('webpack');
const autoPrefixer = require('autoprefixer');
const { join, resolve } = require('path');

require('es6-promise').polyfill();
require('./bootstrap.config.js');
require('./font-awesome.config.js');

const webpackDevTool = (process.env && process.env.WEBPACK_DEVTOOL) || 'cheap-eval-source-map';

module.exports = {
  entry: {
    app: [resolve(__dirname, '../Routes.jsx')],
    bootstrap: 'bootstrap-loader',
    'font-awesome': 'font-awesome-loader',
    vendor: [
      'alt',
      'babel-polyfill',
      'classnames',
      'bootstrap-sass',
      'es6-promise',
      'lodash',
      'react',
      'react-dom',
      'react-router',
      'react-bootstrap',
      'superagent',
    ],
  },
  output: {
    path: join(__dirname, '../..', 'public/app'),
    filename: '[name].js',
  },
  externals: {
    jQuery: 'jquery',
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node-modules/,
        loader: 'babel-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules&minify&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]', 'postcss-loader', 'sass-loader'],
        }),
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=image/gif&name=img/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=image/jpg&name=img/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=65000&mimetype=image/png&name=img/[name].[ext]&publicPath=../../public/app/',
      },
    ],
  },
  devtool: webpackDevTool,
  plugins: [
    new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }),
    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoPrefixer],
      },
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PORT: JSON.stringify('8080'),
      },
    }),
    new Webpack.optimize.CommonsChunkPlugin({ name: 'bootstrap', chunks: ['bootstrap'] }),
    new Webpack.optimize.CommonsChunkPlugin({ name: 'font-awesome', chunks: ['font-awesome'] }),
    new Webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['vendor'],
    }),
    new Webpack.ProvidePlugin({
      React: 'react',
      Router: 'react-router',
      ReactDOM: 'react-dom',
      _: 'lodash',
      classnames: 'classnames',
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        WEBPACK_DEVTOOL: JSON.stringify(process.env.WEBPACK_DEVTOOL || 'cheap-eval-source-map'),
        APP_OID: JSON.stringify(process.env.APP_OID || 'productionApp'),
        PORT: JSON.stringify(process.env.PORT || 8080),
        WEBPACK_PORT: JSON.stringify(process.env.WEBPACK_PORT || 8090),
      },
    }),
  ],
  resolve: {
    extensions: [
      '.jsx', '.js',
    ],
    alias: {
      actions: join(__dirname, '../actions'),
      components: join(__dirname, '../components'),
      views: join(__dirname, '../components/views'),
      controllers: join(__dirname, '../controllers'),
      stores: join(__dirname, '../stores'),
      utilities: join(__dirname, '../utilities'),
    },
  },
};
