const Inert = require('inert');
const Config = require('../config');

function register(server, options, next) {

  server.register(Inert, (err) => {

    if (err) {
      throw err;
    }

    server.route({
      method: 'GET',
      path: '/assets/{q*}',
      handler: {
        directory: {
          path: Config.get('client.assets'),
          listing: true,
          defaultExtension: 'html',
        }
      }
    });

    next();

  });


}

register.attributes = {
  name: 'Happy.Router.Assets'
};

module.exports = register;
