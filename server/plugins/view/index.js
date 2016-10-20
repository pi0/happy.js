const VueHandler = require('./vue/handler');

function register(server, options, next) {

  server.route({
    method: 'GET',
    path: '/{any*}',
    handler: VueHandler(options.vue),
  });

  next();
}

register.attributes = {
  name: 'HapiView'
};

module.exports = register;
