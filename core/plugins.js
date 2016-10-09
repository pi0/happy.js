const Config = require('../config');
const plugins = [];
module.exports = plugins;

// Webpack
plugins.push({register: require('h2o2')});
plugins.push({register: require('../bundler/dev/hapi-middleware')});

// View Engine
plugins.push({
  register: require('../view'),
  options: Config.get('client.view')
});

// Database
plugins.push({
  register: require('../database/MongooseConnector'),
  options: {
    uri: Config.get('database.mongodb.uri'),
    options: Config.get('database.mongodb.options'),
  }
});

// Auth
plugins.push({register: require('hapi-auth-jwt2')});
plugins.push({
  register: require('../auth/plugin'),
  options: {
    key: 'NeverShareYourSecret',                          // Never Share your secret key
    validateFunc: require('../auth').validate,            // validate function defined above
    verifyOptions: {algorithms: ['HS256']},               // pick a strong algorithm
    ignoreExpiration: true,                               //
  },
});

// Router
plugins.push({
  register: require('../router'),
  options: {
    routes: Config.get('app.controllers'),
    include: '**/*.js',
    log: true,
  }
});

// Assets Handler
plugins.push({
  register: require('../router/assets'),
  options: {}
});
