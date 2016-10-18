const Config = require('../../../config');
const Utils = require('../../../utils');
const BaseConfig = require('./base');
const Path = require('path');

module.exports = function (options) {

  // Extend Base Config
  var config = module.exports = BaseConfig({name: 'server'});

  config.devtool='eval';

  // This is a node.js bundle
  config.target = 'node';

  // Server entry
  config.entry = Config.get('entry_server');

  // Server output
  config.output = {
    jsonpFunction: '_jsp', // Change WebpackJsonp function
    path: Config.get('dist_server').path,
    filename: Config.get('dist_server').filename,
    libraryTarget: 'commonjs2',
  };

  config.externals = [
    'fsevents',
    'coffee-script',
    'cson',
    'hjson',
    'iced-coffee-script',
    'properties',
    'toml',
    'x2js',
    'yaml',
    'browser-sync',
    'vertx',
  ];

  config.resolveLoader = {
    modules: [
      Path.resolve(Utils.projectRoot, "node_modules"),
      Path.resolve(Utils.libRoot, "../node_modules"),
    ]
  };

  return config;
};
