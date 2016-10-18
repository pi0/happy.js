const Hapi = require('hapi');
const Config = require('../config');
const Utils = require('../utils');

// Setup IPC BUS
const Bus = require('../bus');
Bus.name = 'app';

// Enable logging
require('../logger');

// Create new server
const server = new Hapi.Server(Config.get('happy'));
module.exports = server;

// Setup server connection
server.connection(Config.get('connection'));

// Setup all plugins
server.register(require('./plugins'), function (err) {

  if (err) {
    console.error(err);
  }

  // Start server
  server.start((err) => {
    if (err) throw err;
    Bus.message('Server up!');
  });

});
