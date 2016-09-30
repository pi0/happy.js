const Hapi = require('hapi');
const Inert = require('inert');
const config = require('../config');

function boot() {

  // Create new server
  const server = new Hapi.Server();

  // Setup server connection
  server.connection(config.get('app.connection'));

  // Setup routes
  server.register([Inert], function (err) {
    if (err) throw err;
    const Routes = require(config.get('app.project.routes'));
    Routes(server);
  });

  // Start server
  server.start((err) => {
    if (err) throw err;
    console.log('Server running at: ', server.info.uri);
  });

}
