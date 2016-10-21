const VueHandler = require('../../view/vue/handler');

function register(server, options, next) {

  var handler = VueHandler(options.vue);

  server.route({
    method: 'GET',
    path: '/{any*}',
    handler,
  });

  next();
}

register.attributes = {
  name: 'HapiView'
};

module.exports = register;
