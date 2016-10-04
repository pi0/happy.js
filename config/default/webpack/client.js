const Webpack = require('webpack');
const BaseConfig = require('./base');
const DevServer = require('./dev-server');
const BrowserSyncConfig = require('./browser-sync');
const Config = require('../../../config');

module.exports = function () {

  // Extend Base Config
  var config = BaseConfig();

  config.entry = {
    app: Config.get('client.project.entry'),
    vendor: Config.get('client.project.vendor'),
  };

  config.output = {
    path: Config.get('client.project.dist'),
    //filename: 'client-entry.js',
    publicPath: '/dist/',
  };

  // Extract vendor chunks for better caching
  config.plugins.push(new Webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
  }));


  if (process.env.NODE_ENV !== 'production') {

    // HMR Plugin
    config.plugins.push(new Webpack.HotModuleReplacementPlugin());

    // Enable watch
    config.watch = true;

    // Source maps
    // config.devtool = '#source-map';

    // DevServer config
    config.devServer = DevServer;

    // BrowserSync Plugin
    const BrowserSyncPlugin = require('browser-sync-Webpack-plugin');
    config.plugins.push(new BrowserSyncPlugin(BrowserSyncConfig(), {
      // prevent BrowserSync from reloading the page.
      // and let Webpack Dev Server take care of this
      reload: true,
    }));

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

  return config;
};
