const Webpack = require('webpack');
const BaseConfig = require('./base');
const Config = require('../../../config');
const Utils = require('../../../utils');

module.exports = function () {

  // Extend Base Config
  var config = BaseConfig({name: 'client'});

  // Client entry
  config.entry = {
    app: Config.get('entry_client'),
    vendor: Config.get('vendor'),
  };

  // Extract vendor chunks for better caching
  config.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: Config.get('dist.vendor_filename'),
  }));

  // Client output
  config.output = Object.assign({
    filename: Config.get('dist.filename'),
  }, config.output);

  // Config Vue style loader
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    options: {
      vue: {
        loaders: {
          'scss': 'vue-style!css!sass', // This will match all <style lang=scss> tags
        }
      }
    }
  }));

  if (!Utils.isProd()) { // Development Config
    // HMR Plugin
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    // Push HMR Dependencies
    config.entry.vendor.push('webpack-dev-server/client?http://0.0.0.0:3001');
    config.entry.vendor.push('webpack/hot/dev-server');

  } else { // Production Config

    // Use ExtractTextPlugin to extract CSS into a single file, so it's applied on initial render
    //const ExtractTextPlugin = require('extract-text-webpack-plugin');
    //config.plugins.push(new ExtractTextPlugin('styles.css'));

    // NoErrors
    config.plugins.push(new Webpack.NoErrorsPlugin());

    //
    config.plugins.push(new Webpack.optimize.DedupePlugin());

  }

  return config;
};

