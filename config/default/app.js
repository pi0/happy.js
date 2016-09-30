const path = require('path');
const Utils = require('../../utils');
const Config = require('../../config');

var config = {};

module.exports = function () {

  config.dirs = Config.has('app.dirs') ? Config.get('app.dirs') : ['app', 'config','vendor'];

  config.project = {
    entry: Utils.projectPath('app/http'),
    src: Utils.projectPath('{' + config.dirs.join(',') + '}/**/*.js'),
    routes: Utils.projectPath('app/http/routes'),
    dist: path.resolve(Utils.projectRoot, 'dist'),
  };

  config.babel = {
    "presets": [
      ["es2015"]
    ]
  };

  config.connection = {
    port: 3003
  };

  config.nodemon = {

    // Nodemon the dev server
    script: path.resolve(config.project.dist,'app/http'),

    // Watch core server file(s) that require restart on change
    watch: config.dirs.map(function (d) {
      return path.resolve(Utils.projectRoot, d);
    }),

    // Options
    verbose: false,
    debug: 3009,

    // Compile synchronously onChange
    tasks: ['compile']

  };


  return config;
};

