const Config = require('../config');
const H2O2 = require('h2o2');
const View = require('../view');
const Database = require('../database');
const JWT2 = require('hapi-auth-jwt2');
const Auth = require('../auth/plugin');

//
const plugins = module.exports = [];

// Webpack
plugins.push({register: H2O2});

// View Engine
plugins.push({
  register: View,
  options: Config.get('view')
});

// Database
if (Config.get('database.mongodb.uri')) {
  plugins.push({
    register: Database,
    options: {
      uri: Config.get('database.mongodb.uri'),
      options: Config.get('database.mongodb.options'),
    }
  });
}// TODO: else warn

// Auth
plugins.push({register: JWT2});
plugins.push({
  register: Auth,
  options: {
    key: Config.get('jwt.secret'),
    validateFunc: require('../auth').validate,
    verifyOptions: Config.get('jwt.verify'),
    ignoreExpiration: Config.get('jwt.ignoreExpiration'),
  },
});

// Router
plugins.push({
  register: require('../router'),
  options: {
    routes: Config.get('routes'),
    include: '**/*.js',
    log: false,
  }
});

// Assets Handler
plugins.push({
  register: require('../router/assets'),
  options: {}
});
