const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const {resolve, join} = require('path');

const appOid = (process.env && process.env.APP_OID) || 'productionApp';
const port = (process.env && process.env.PORT) || 3000;

const server = new Hapi.Server();
// server.connection({port: port});

console.log('process.env.HOST', process.env.HOST);
server.connection({
    port: process.env.PORT || 3000
});

const routes = [
  {
    method: 'GET',
    path: '/public/app/{file}',
    handler: (request, reply) => {
      directory: {
        path: join(__dirname, '../../public/app')
      }
      const file = request.params.file;
      const filename = resolve(__dirname, `../../public/app/${file}`);
      return reply.file(filename);
    }
  }, {
    method: 'GET',
    path: '/public/app/fonts/{file}',
    handler: (request, reply) => {
      directory: {
        path: join(__dirname, '../../public/app/fonts')
      }
      const file = request.params.file;
      const filename = resolve(__dirname, `../../public/app/fonts/${file}`);
      return reply.file(filename);
    }
  }, {
    method: 'GET',
    path: '/',
    handler: function(request, reply) {
      const filename = resolve(__dirname, '../../index.html');
      return reply.file(filename).type('text/html');
    }
  }
];

server.route(routes);

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
    path: join(__dirname, '../../public/app')
  });

});

server.start(function() {
  console.log('Server running at:', server.info.uri);
});
