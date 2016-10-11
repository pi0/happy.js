const Webpack = require('webpack');
const BaseConfig = require('./base');
const Config = require('../../../../config');

// Extend Base Config
var config = module.exports = BaseConfig({name: 'ssr'});

// This is a node.js bundle
config.target = 'node';

// App Entry
config.entry = Config.get('client.entry');

// Output settings
config.output = Object.assign({
  path: Config.get('client.dist_app'),
  filename: 'app-entry.js', //TODO
  libraryTarget: 'commonjs2',
}, config.output);

// Set VUE_ENV to server inside bundle
config.plugins.push(new Webpack.DefinePlugin({
  'process.env.VUE_ENV': '"server"'
}));


return config;
