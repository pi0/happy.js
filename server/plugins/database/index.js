const Mongoose = require('mongoose');
require('./mongoose');

exports.register = (server, config, next) => {
  Mongoose.connect(config.uri, config.options);
  next();
};

exports.register.attributes = {
  pkg: {"name": "hapi-mongoose-connector"},
};
