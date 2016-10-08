exports.register = (server, options, next) => {

  require('../ipc/client');

  server.route({
    method: 'GET',
    path: '/dist/{a*}',
    handler: {
      proxy: {
        host: 'localhost',
        port: '3019',
        protocol: 'http'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/webpack-dev-server/{a*}',
    handler: {
      proxy: {
        host: 'localhost',
        port: '3019',
        protocol: 'http'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/__webpack\-dev\-server__/{a*}',
    handler: {
      proxy: {
        host: 'localhost',
        port: '3019',
        protocol: 'http'
      }
    }
  });

  next();
};

exports.register.attributes = {
  name: 'Happier.Dev.Middleware'
};

