const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.base.config.js');

const Hapi = require('hapi');
const Inert = require('inert');
// const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

const { resolve } = require('path');

// const appOid = (process.env && process.env.APP_OID) || 'productionApp';
// const webpackPort = (process.env && process.env.WEBPACK_PORT) || 8090;
const port = (process.env && process.env.PORT) || 8080;

const server = new Hapi.Server();
const compiler = webpack(webpackConfig);
compiler.apply(new DashboardPlugin());

server.connection({ host: 'localhost', port });
server.register(Inert, () => {});

const devMiddleware = webpackDevMiddleware(compiler, {
  publicPath: '/public/app/',
  quiet: true,
  noInfo: true,
  hot: true,
  errorsOnly: true
});

const hotMiddleware = webpackHotMiddleware(compiler, {
  log: () => {},
  hot: true,
  quiet: true,
  noInfo: true,
  reload: true,
  errorsOnly: true
});

server.ext('onRequest', (request, reply) => {
  devMiddleware(request.raw.req, request.raw.res, (error) => {
    if (error) {
      console.log('onRequest devMiddleware', error);
      return reply(error);
    }
    return reply.continue();
  });
});

server.ext('onRequest', (request, reply) => {
  hotMiddleware(request.raw.req, request.raw.res, (error) => {
    if (error) {
      console.log('onRequest hotMiddleware', error);
      return reply(error);
    }
    return reply.continue();
  });
});

server.ext('onPreResponse', (request, reply) => {
  const filename = resolve(__dirname, '../../index.html');
  return reply.file(filename).type('text/html');
});

server.start((error) => {
  if (error) {
    console.log('Error found', error);
    throw error;
  }
});
