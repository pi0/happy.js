const Config = require('../../config');
const Utils = require('../../utils');

const H2O2 = require('h2o2');
const DatabasePlugin = require('./database');
const JWT2Plugin = require('hapi-auth-jwt2');
const AuthPlugin = require('./auth');
const RouterPlugin = require('./router');

module.exports = function (options) {
  const plugins = [];

  // H2O2 Proxy
  plugins.push({register: H2O2});

  // Database
  if (Config.has('database.mongodb.uri')) {
    plugins.push({
      register: DatabasePlugin,
      options: {
        uri: Config.get('database.mongodb.uri'),
        options: Config.get('database.mongodb.options'),
      }
    });
  }

  // Auth
  plugins.push({register: JWT2Plugin});
  plugins.push({
    register: AuthPlugin,
    options: {
      key: Config.get('jwt.secret'),
      verifyOptions: Config.get('jwt.verify'),
      ignoreExpiration: Config.get('jwt.ignoreExpiration'),
      validator: options.auth ? options.auth.validator : undefined
    },
  });

  // Router
  plugins.push({
    register: RouterPlugin,
    options: {
      routes: Utils.projectPath('app'),
      include: '**/*.js',
      ignore: ['_*'],
      log: false,
      view: Config.get('view'),
    }
  });

  return plugins;
};
