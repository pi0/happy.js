const path = require('path');
const Utils = require('../utils');
const Config = require('../config');

var config = {};

config.dirs = Config.has('app.dirs') ? Config.get('app.dirs') : ['app', 'config'];

config.entry = Utils.projectPath('index.js');
config.src = Utils.projectPath('{' + config.dirs.join(',') + '}/**/*.js');
config.controllers = Utils.projectPath('app/controllers');
config.dist = path.resolve(Utils.projectRoot, 'dist');

config.babel = {
  "presets": [
    ["es2015"]
  ]
};

config.connection = {
  port: 3000
};

module.exports = config;

