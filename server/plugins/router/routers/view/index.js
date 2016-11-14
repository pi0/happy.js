const VueHandler = require('./vue/handler');

function register(server, options, next) {

  var vueHandler = new VueHandler(options.vue);

  server.handler('vue', ()=>vueHandler.handle);

  server.decorate('reply', 'vue', function (path, responseOptions) {
    return vueHandler.handle(this.request, this.response);
  });

  server.route({method: 'GET', path: '/{any*}', handler: {vue: {}}});

  return next();
}

register.attributes = {
  name: 'HapiView'
};

module.exports = register;
