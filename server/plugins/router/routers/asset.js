const Inert = require('inert');
const Config = require('../../../../config');

function register(server, options) {

  server.register(Inert, (err) => {
    if (err) throw err;

    server.route({
      method: 'GET',
      path: '/assets/{q*}', // TODO: use Config
      config: {auth: false},
      handler: {
        directory: {
          path: Config.get('assets'),
          listing: false,
          defaultExtension: 'html',
        }
      }
    });

    server.route({
      method: 'GET',
      path: '/dist/{q*}', // TODO: use Config
      config: {auth: false},
      handler: {
        directory: {
          path: Config.get('dist.path'),
          listing: false,
          defaultExtension: 'html',
        }
      }
    });

  });

}

register.attributes = {
  name: 'happy_router_asset',
};

module.exports = register;
