const mongoose = require('mongoose');
const EventEmitter = require('events').EventEmitter;

class MongooseConnector extends EventEmitter {

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
        });

        this.connection.on('disconnected', () => {
            server.log(['warn', 'database', 'mongoose', 'mongodb'], 'Connection to database disconnected');
            this.emit('disconnected');
        });
    }
}

exports.register = (server, options, next) => {

    let connector = new MongooseConnector(options, server);

    connector.on('ready', () => {
        console.log('[Mongoose] Ready');
        server.expose('mongoose', connector.mongoose);
        server.expose('connection', connector.connection);
    });

    next();

    connector.on('error', err => next(err));
};

exports.register.attributes = {
    pkg: {"name": "hapi-mongoose-connector"},
};
