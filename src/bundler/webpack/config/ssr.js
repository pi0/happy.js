const Webpack = require('webpack');
const BaseConfig = require('./base');
const Config = require('../../../config');

module.exports = function () {
  // Extend Base Config
  var config = BaseConfig({name: 'ssr'});

  // This is a node.js bundle
  config.target = 'node';

  // Client entry
  config.entry = Config.get('entry_client');
  config.externals = Config.get('vendor');

  // Output settings
  config.output = Object.assign({
    filename: Config.get('dist').filename_ssr,
    libraryTarget: 'commonjs2',
  }, config.output);

  // Set VUE_ENV to server inside bundle
  config.plugins.push(new Webpack.DefinePlugin({
    'process.env.VUE_ENV': '"server"'
  }));

  return config;
};
