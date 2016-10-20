const Config = require('../../config');
const H2O2 = require('h2o2');

const ViewPlugin = require('./view');
const DatabasePlugin = require('./database');
const JWT2Plugin = require('hapi-auth-jwt2');
const AuthPlugin = require('./auth');
const RouterPlugin = require('./router');

const plugins = module.exports = [];

// H2O2 Proxy
plugins.push({register: H2O2});

// View Engine
plugins.push({
  register: ViewPlugin,
  options: Config.get('view')
});

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
  },
});

// Router
plugins.push({
  register: RouterPlugin,
  options: {
    routes: Config.get('routes'),
    include: '**/*.js',
    log: false,
  }
});
