const Path = require('path');
const Utils = require('../../../utils');
const Config = require('../../../config');

module.exports = function (script,watch_dirs) {

  var config = {};

  // Nodemon the dev server
  config.script = script;

  // Watch core server file(s) that require restart on change
  config.watch = watch_dirs;

  // Options
  config.verbose = false;
  config.debug = 3009;

  // Compile synchronously onChange
  config.tasks = ['compile'];

};
