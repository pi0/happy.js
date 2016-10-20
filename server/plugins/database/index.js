const MongooseConnector = require('./MongooseConnector');

exports.register = (server, options, next) => {
  let connector = new MongooseConnector(options, server);

  connector.on('ready', () => {
    server.expose('mongoose', connector.mongoose);
    server.expose('mongo', connector.connection);
    next();
  });

  connector.on('error', err => next(err));
};

exports.register.attributes = {
  pkg: {"name": "hapi-mongoose-connector"},
};
