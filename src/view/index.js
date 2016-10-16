// const Vision = require('vision');
// const Path = require('path');
// const Config = require('../config');
const VueEngine = require('./vue');

function register(server, options, next) {

  // Vue
  const vue = VueEngine(options.vue);
  server.route({
    method: 'GET',
    path: '/{any*}',
    handler: vue,
  });

  // Vision TODO
  // server.register(Vision, function (err) {
  //     if (err) {
  //         console.log("Failed to load vision.");
  //     }
  // });

  next();
}

register.attributes = {
  name: 'Hapi View Middleware'
};

module.exports = register;
