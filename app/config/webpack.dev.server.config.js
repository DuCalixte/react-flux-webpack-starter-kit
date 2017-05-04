const webpack = require('webpack');
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.development.config.js');

const port = process.env.PORT || '8070';
const webpackPort = process.env.WEBPACK_PORT || '8090';

// webpackConfig.devServer = {
//   contentBase: '/public/app/',
//   compress: true,
//   port: port,
//   inline: true,
//   hotOnly: true,
//   headers: {
//     'Access-Control-Allow-Origin': `http://localhost:${port}`,
//     'Access-Control-Allow-Headers': 'X-Requested-With',
//   }
// };

// webpackConfig.devServer.listen(webpackPort, 'localhost', (err) => {
//   if (err) {
//     console.error(err);
//   }
//   console.warn(`webpack dev server listening on localhost:${webpackPort}`);
// });

// module.exports = webpackConfig;

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/public/app/',
  inline: true,
  hotOnly: true,
  stats: 'errors-only',
  // colors: true,
  // historyApiFallback: true,
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
