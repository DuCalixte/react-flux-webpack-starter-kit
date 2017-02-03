var webpack = require('webpack');

var WebpackDevServer = require('webpack-dev-server');

var webpackConfig = require('./webpack.dashboard.config.js');

const port = process.env.PORT || '8080';
const webpackPort = process.env.WEBPACK_PORT || '8090';

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: '/public/app/',
  noInfo: true,
  inline: true,
  hot: true,
  quiet: true,
  log: () => {},
  stats : {
    chunks: false,
    chunkModules: false,
    colors: true,
    errorsOnly: true
},
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

//server.listen(port, host, () => console.log(`{green-fg}Dev server started on:{/} ${schema}://${host}:${port}`));
