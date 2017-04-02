var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.dashboard.config.js');

// var Dashboard = require('webpack-dashboard');
// var DashboardPlugin = require('webpack-dashboard/plugin');

// const dashboard = new Dashboard();
const port = process.env.PORT || '8080';
const webpackPort = process.env.WEBPACK_PORT || '8090';

// webpack(webpackConfig).plugins.push(new DashboardPlugin(dashboard.setData));
// webpack(webpackConfig).apply(new DashboardPlugin(dashboard.setData));

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/public/app/',
  clientLogLevel: 'none',
  quiet: true,
  noInfo: true,
  inline: true,
  hot: true,
  stats: 'errors-only',
  colors: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': `http://localhost:${port}`,
    'Access-Control-Allow-Headers': 'X-Requested-With',
  },
  // type: 'clear',
  // log: () => {},
//   stats : {
//     hash: false,
//     version: false,
//     timings: false,
//     assets : false,
//     chunks : false,
//     chunkModules : false,
//     chunk : false,
//     chunkModule : false,
//     children: false,
//     cached: false,
//     reasons: false,
//     source: false,
//     errorDetails: true,
//     chunkOrigins: false,
//     colors: true,
//     errorsOnly: true
// },
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

// server.listen(port, host, () => console.log(`{green-fg}Dev server started on:{/} ${schema}://${host}:${port}`));
