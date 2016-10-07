const Hapi = require('hapi');
const Inert = require('inert');
const config = require('../config');
const Router = require('./router');
const View = require('../view');
const Mongoose = require('../mongoose');
const Config = require('../config');

function boot() {

  var kernel = {};

  // Create new server
  const server = new Hapi.Server();
  kernel.server = server;

  // Setup server connection
  server.connection(config.get('app.connection'));

  // Setup routes
  kernel.router = Router(server);

  // Setup Webpack
  require('../builder/ipc/client');
  require('../builder/dev/hapi-middleware').register(server);

  // Setup View Engine
  kernel.view = View(server);

  // Setup Database
  kernel.mongoose = Mongoose(server);

  // Start server
  server.start((err) => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
  });

  return kernel;
}

module.exports = boot;
