// Based on https://github.com/asilluron/hapi-mongoose/blob/master/lib/MongooseConnector.js
const mongoose = require('mongoose');
const EventEmitter = require('events').EventEmitter;

module.exports = class extends EventEmitter {

  constructor(config, server) {
    super();

    this.connection = mongoose.createConnection(config.uri, config.options);

    this.connection.on('connected', () => {
      server.log(['info', 'database', 'mongoose', 'mongodb'], 'Connected');
      this.emit('ready');
    });

    this.connection.on('error', err => {
      server.log(['error', 'database', 'mongoose', 'mongodb'], `Unable to connect to database: ${err.message}`);
      this.emit('error', err);
    });

    this.connection.on('close', () => {
      server.log(['info', 'database', 'mongoose', 'mongodb'], 'Connection to database closed');
      this.emit('closed');
    });

    this.connection.on('disconnected', () => {
      server.log(['warn', 'database', 'mongoose', 'mongodb'], 'Connection to database disconnected');
      this.emit('disconnected');
    });

  }
};

