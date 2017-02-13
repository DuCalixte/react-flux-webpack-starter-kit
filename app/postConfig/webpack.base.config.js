var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Webpack = require('webpack');
var autoPrefixer = require('autoprefixer');

var path = require('path');
require('es6-promise').polyfill();
require('./bootstrap.config.js');
require('./font-awesome.config.js');

// module.exports = (env) => {
//   return {
  module.exports = {
    entry: {
      app: [path.resolve(__dirname, '../Routes.jsx')],
      bootstrap: 'bootstrap-loader',
      'font-awesome': 'font-awesome-loader',
    },
    // vendor: [
    //   'alt', 'babel-polyfill', 'classnames', 'bootstrap-sass', 'font-awesome',
    //   'es6-promise', 'lodash', 'react', 'react-dom', 'react-router', 'react-bootstrap', 'superagent', 'react-hot-loader',
    // ],
    output: {
      path: path.join(__dirname, '../..', 'public/app'),
      filename: '[name].[chunkhash].js',
    },
    externals: {
      jQuery: 'jquery',
    },
    module: {
      rules: [{
        test: /.jsx?$/,
        exclude: /node-modules/,
        use: 'babel-loader',
      }, {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({fallback: 'style-loader', loader: 'css-loader?modules&minify&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!sass-loader'}),
      }, {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=65000&mimetype=image/svg+xml&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=65000&mimetype=application/font-woff&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=65000&mimetype=application/font-woff2&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=65000&mimetype=application/octet-stream&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=fonts/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.gif(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=65000&mimetype=image/gif&name=img/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.jpg(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=65000&mimetype=image/jpg&name=img/[name].[ext]&publicPath=../../public/app/',
      }, {
        test: /\.png(\?v=\d+\.\d+\.\d+)?$/,
        use: 'url-loader?limit=65000&mimetype=image/png&name=img/[name].[ext]&publicPath=../../public/app/',
      }],
    },
    // postcss: [autoPrefixer],
    devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
    plugins: [
      new Webpack.LoaderOptionsPlugin({
         options: {
           postcss: [autoPrefixer],
          //  devtool: process.env.WEBPACK_DEVTOOL || 'cheap-module-source-map',
           vendor: [
             'alt', 'babel-polyfill', 'classnames', 'bootstrap-sass', 'font-awesome',
             'es6-promise', 'lodash', 'react', 'react-dom', 'react-router', 'react-bootstrap', 'superagent', 'react-hot-loader',
           ],
         }
       }),
      new ExtractTextPlugin({fallback: 'styles.css', allChunks: true}),
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.PORT': JSON.stringify(process.env.PORT || 8080),
        'process.env.WEBPACK_PORT': JSON.stringify(process.env.WEBPACK_PORT || 8090)
      }),
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'bootstrap',
        chunks: ['bootstrap'],
      }),
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'font-awesome',
        chunks: ['font-awesome'],
      }),
      new Webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['vendor'],
      }),
      new Webpack.ProvidePlugin({
        React: 'react',
        _: 'lodash',
        classnames: 'classnames',
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
    resolve: {
      extensions: ['.jsx', '.js'],
      alias: {
        actions: path.join(__dirname, '../actions'),
        components: path.join(__dirname, '../components'),
        views: path.join(__dirname, '../components/views'),
        controllers: path.join(__dirname, '../controllers'),
        stores: path.join(__dirname, '../stores'),
        utilities: path.join(__dirname, '../utilities'),
      },
    }
  // };
};
