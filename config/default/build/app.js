const Webpack = require('webpack');
const BaseConfig = require('./base');
const Config = require('../../../config');
const Utils = require('../../../utils');
const Path = require('path');

module.exports = function () {

  // Extend Base Config
  var config = Object.assign({}, BaseConfig());

  config.target = 'node';

  config.entry = [
    Config.get('client.entry_app')
  ];

  config.output = Object.assign({
    path: Config.get('client.dist_app'),
    filename: 'app-entry.js',
    libraryTarget: 'commonjs2'
  },config.output);

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
  ];

  // Vue bug ??
  config.plugins.push(new Webpack.IgnorePlugin(/vertx/));

  config.plugins.push(new Webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    'process.env.VUE_ENV': '"server"'
  }));


  return config;
};
