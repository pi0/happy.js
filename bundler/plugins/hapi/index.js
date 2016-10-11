exports.register = (server, options, next) => {

  server.route({
    method: 'GET',
    path: '/dist/{a*}',
    handler: {
      proxy: {
        host: 'localhost',
        port: '3019',//TODO
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
        port: '3019',//TODO
        protocol: 'http'
      }
    }
  });


  next();
};

exports.register.attributes = {
  name: 'Happier.Dev.Middleware'
};

