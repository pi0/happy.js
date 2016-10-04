const path = require('path');
const Utils = require('../../utils');
const Config = require('../../config');

module.exports = function () {

  var config = {};

  config.dirs = Config.has('app.dirs') ? Config.get('app.dirs') : ['app', 'config'];

  config.entry = Utils.projectPath('app/http');
  config.src = Utils.projectPath('{' + config.dirs.join(',') + '}/**/*.js');
  config.routes = Utils.projectPath('app/routes');
  config.dist = path.resolve(Utils.projectRoot, 'dist');

  config.babel = {
    "presets": [
      ["es2015"]
    ]
  };

  config.connection = {
    port: 3003
  };

  const Nodemon = require('./build/nodemon');
  config.nodemon = Nodemon(config.dirs.map(function (d) {
    return path.resolve(Utils.projectRoot, d);
  }));

  return config;
};

