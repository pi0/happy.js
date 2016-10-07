const MongooseConnector = require('./MongooseConnector');
const Config = require('../config');

module.exports = function (server) {

    const plugin = {
        register: MongooseConnector,
        options: {
            uri: Config.get('database.mongodb.uri'),
            options: Config.get('database.mongodb.options'),
        }
    };

    server.register(plugin, function (err) {
        if(err)
            throw err;
    });

};
