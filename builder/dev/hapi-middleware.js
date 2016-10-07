function registerH2O2(server) {
  server.register({
    register: require('h2o2')
  }, function (err) {
    if (err)
      console.error('Failed to load h2o2');
  });
}

exports.register = (server, options, next) => {

  registerH2O2(server);

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

  if (next) next();
};
