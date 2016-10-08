const Webpack = require('webpack');
const BaseConfig = require('./webpack.config.common');
const Config = require('../../config');
const Utils = require('../../utils');

// Extend Base Config
module.exports = function () {

  var config = BaseConfig();

  config.entry = {
    app: Config.get('client.entry'),
    vendor: Config.get('client.vendor'),
  };

  config.output = Object.assign({
    path: Config.get('client.dist'),
    filename: 'app.js',
    publicPath: '/dist/',
  }, config.output);

// Extract vendor chunks for better caching
  config.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
  }));

// Style Loader
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    options: {
      vue: {
        loaders: {
          'scss': 'vue-style!css!sass',
          fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
        }
      }
    }
  }));

  if (!Utils.isProd) {

    // Dev server
    // config.devServer = require('./webpack.dev-server');

    // HMR Plugin
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    // BrowserSync Plugin
    const BrowserSyncPlugin = require('../plugins/browser-sync-webpack-plugin');
    const BrowserSyncConfig=require('./browser-sync');
    config.plugins.push(new BrowserSyncPlugin(BrowserSyncConfig()));

  } else { // Production

    // Strip comments in Vue code & hort-circuits all Vue.js warning code
    config.plugins.push(new Webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')}));

    // Use ExtractTextPlugin to extract CSS into a single file, so it's applied on initial render
    const ExtractTextPlugin = require('extract-text-Webpack-plugin');

    // ExtractText Plugin for Styles
    config.plugins.push(new ExtractTextPlugin('styles.css'));

    // This is needed in Webpack 2 for minifying CSS
    config.plugins.push(new Webpack.LoaderOptionsPlugin({minimize: true}));

    // Minify with dead-code elimination
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));

    // NoErrors
    config.plugins.push(new Webpack.NoErrorsPlugin());

    // Optimize module ids by occurence count
    //config.plugins.push(new Webpack.optimize.OccurenceOrderPlugin());

  }


  return config
};
