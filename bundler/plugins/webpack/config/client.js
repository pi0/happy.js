const Webpack = require('webpack');
const BaseConfig = require('./base');
const Config = require('../../../../config');
const Utils = require('../../../../utils');
const DevServerConfig = require('./dev-server');

// Extend Base Config
var config = module.exports = BaseConfig({name: 'client'});

// Client entry
config.entry = {
  app: Config.get('client.entry'),
  vendor: Config.get('client.vendor'),
};

// Client output
config.output = Object.assign({
  path: Config.get('client.dist'),
  filename: 'app.js',//TODO
  publicPath: '/dist/',//TODO
}, config.output);

// Extract vendor chunks for better caching
config.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js'
}));

if (!Utils.isProd) { // Development Config

  // HMR Plugin
  config.plugins.push(new Webpack.HotModuleReplacementPlugin());

  // Push HMR Dependencies
  config.entry.vendor.push('webpack-dev-server/client?http://0.0.0.0:' + DevServerConfig.port);
  config.entry.vendor.push('webpack/hot/dev-server');

} else { // Production Config

  // Use ExtractTextPlugin to extract CSS into a single file, so it's applied on initial render
  const ExtractTextPlugin = require('extract-text-Webpack-plugin');
  config.plugins.push(new ExtractTextPlugin('styles.css'));

}

