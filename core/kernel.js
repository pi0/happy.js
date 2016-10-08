const Hapi = require('hapi');
const Config = require('../config');
const Colors = require('colors');
const Utils = require('../utils');

// Create new server
const server = new Hapi.Server();
module.exports = server;

// Setup server connection
server.connection(Config.get('app.connection'));

// Setup all plugins
server.register(require('./plugins'), function (err) {

  if (err) {
    console.error(err);
  }

  // Start server
  server.start((err) => {
    if (err) throw err;
    Utils.clearConsole();
    console.log('Server running at: ', server.info.uri);
  });

});


