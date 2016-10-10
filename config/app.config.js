const path = require('path');
const Utils = require('../utils');
const Config = require('../config');

var config = {};

config.dirs = Config.has('app.dirs') ? Config.get('app.dirs') : ['app', 'config'];

config.entry = Utils.projectPath('app/index.js');
config.src = Utils.projectPath('{' + config.dirs.join(',') + '}/**/*.js');
config.routes = Utils.projectPath('app/routes');
config.dist = path.resolve(Utils.projectRoot, 'dist');
config.jwt = {
  secret: 'SOOOSECURE',
  verify: {
    algorithms: ['HS256']
  },
  ignoreExpiration: true,
};

config.babel = {
  "presets": [
    ["es2015"]
  ]
};

config.connection = {
  port: 3000
};

module.exports = config;

