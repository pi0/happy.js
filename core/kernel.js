const Hapi = require('hapi');
const Inert = require('inert');
const config = require('../config');
const Router = require('./router');
const View = require('../view');

function boot() {

  //
  var kernel={};

  // Create new server
  const server = new Hapi.Server();

  // Setup server connection
  server.connection(config.get('app.connection'));

  // Setup routes
  Router(server);

  // Setup View Engine
  kernel.view=View(server);

  // Start server
  server.start((err) => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
  });

  return kernel;
}

module.exports = boot;
