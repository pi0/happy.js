const Webpack = require('webpack');
const BaseConfig = require('./base');
const Config = require('../../../config');
const Utils = require('../../../utils');
const Path = require('path');

module.exports = function () {
  // Extend Base Config
  var base = BaseConfig();

  return Object.assign(base, {

    target: 'node',
    devtool: '#source-map',
    entry: Config.get('app.project.entry'),

    output: {
      path: Config.get('app.project.dist'),
      filename: 'index.js',
      libraryTarget: 'commonjs2'
    },

    externals: [
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
    ],

    plugins: [
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
      })
    ]

  });

};
