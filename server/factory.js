const Hapi = require('hapi');
const Config = require('../config');
const Bus = require('../bus');

module.exports = function (options) {

  // Instance name
  var name = Bus.name = options.name ? options.name : 'server';

  // Create new server
  const server = new Hapi.Server(Config.get('hapi'));
  module.exports = server;

  // Set server connection
  server.connection(Config.get('connection'));

  // Register all plugins
  server.register(options.plugins, function (err) {
    if (err) console.error(err);

    // Start server
    server.start((err) => {
      if (err) throw err;
      Bus.message(name + ' is up!');
    });
  });

};
