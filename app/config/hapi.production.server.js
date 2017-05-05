const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const {resolve} = require('path');

const appOid = (process.env && process.env.APP_OID) || 'productionApp';
const port = (process.env && process.env.PORT) || 3000;

const server = new Hapi.Server();
server.connection({port: port});

server.route({
  method: 'GET',
  path: '/',
  // handler: (request, reply) => {
  //   return reply.view('app-spa-compiled', {request: request});
  // }
  handler: (request, reply) => {
    const filename = resolve(__dirname, '../../index.html');
    return reply.file(filename).type('text/html');
  }
});

var plugins = [require('inert'), require('vision'), require('hapi-heroku-helpers')];

server.register(plugins, (err) => {
  if (err) {
    console.error('Failed to load plugins:', err);
  }

  server.views({
    engines: {
      jsx: require('hapi-react-views')
    },
    relativeTo: __dirname,
    path: `../../public/app`
    // path: `../../public/${appOid}/app`
  });

});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
