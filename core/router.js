const Wurst = require('wurst');
// const Path = require('path');
const Config = require('../config');

module.exports = function (server) {

  const plugin = {
    register: Wurst,
    options: {

      // The absolute path to the routes directory.
      routes: Config.get('app.routes'),

      // The glob pattern or an array of patterns to exclude route files.
      // ignore: 'foo/**/*.js',

      // If true, the plugin logs the prefixed routes into console.
      log: false,

    }
  };

  server.register(plugin, function (err) {
    if (err) {
      throw err;
    }
  });

  return plugin;
};

// server.register([Inert], function (err) {
//   if (err) throw err;
//   var Routes = require(config.get('app.routes'));
//   Routes(server);
// });
