const Webpack = require('webpack');
const config = require('./webpack.base.config.js');
const {resolve} = require('path');

const appOid = (process.env && process.env.APP_OID) || 'productionApp';
// config.output = {
//   path: resolve(__dirname, '../..', `public/${appOid}/app`),
//   filename: '[name]-spa-compiled.js'
// };

config.plugins.push(
  new Webpack.NoEmitOnErrorsPlugin(),
  new Webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
  }
}), new Webpack.LoaderOptionsPlugin({minimize: true, debug: false})
// new Webpack.optimize.UglifyJsPlugin({
//   beautify: false,
//   mangle: {
//     screw_ie8: true,
//     keep_fnames: true
//   },
//   compress: {
//     screw_ie8: true
//   },
//   comments: false
// })
);

// config.plugins.push(new Webpack.NoErrorsPlugin());
// config.plugins.push(new Webpack.DefinePlugin({
//   'process.env': {
//     NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
//   }
// }));
//
// config.plugins.push(new Webpack.LoaderOptionsPlugin({minimize: true, debug: false});
// config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
//       beautify: false,
//       mangle: {
//         screw_ie8: true,
//         keep_fnames: true
//       },
//       compress: {
//         screw_ie8: true
//       },
//       comments: false
//     });
module.exports = config;
