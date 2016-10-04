const ExtractTextPlugin = require('extract-text-Webpack-plugin');
const path = require('path');
const Webpack = require('Webpack');
const Config = require('../../../config');

module.exports = function () {

  var config = {};

  // Resolver config
  config.resolve = {
    extensions: ['', '.js', '.vue'],
    alias: Config.get('client.aliases'),
  };

  config.devtool = '#eval';

  // Enable watch
  config.watch = true;
  config.watchOptions = {
    aggregateTimeout: 1000,
    poll: true,
  };


  config.output = {
    // change WebpackJsonp function
    jsonpFunction: '_jsp',
  };

  config.plugins = [];

  // vue-loader configurations
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    vue: {

      // Configure autoprefixer
      autoprefixer: {
        browsers: ['last 2 versions']
      },

      // Loaders
      loaders: {
        scss: ExtractTextPlugin.extract({
          loader: "css-loader!scss-loader",
          fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
        })
      },
    }
  }));

  // WatchIgnorePlugin
  // config.plugins.push(new Webpack.WatchIgnorePlugin(/app/));
  // config.plugins.push(new Webpack.WatchIgnorePlugin(/config/));
  // config.plugins.push(new Webpack.WatchIgnorePlugin(/node_modules/));

  config.module = {
    loaders: [
      // Vue
      {
        // use vue-loader for *.vue files
        test: /\.vue$/,
        loader: 'vue'
      },
      // Vue HTML
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      // JS
      {
        // use babel-loader for *.js files
        test: /\.js$/,
        loader: 'babel',
        // important: exclude files in node_modules, otherwise it's going to be really slow!
        exclude: /node_modules|vendor/
      },
      // JSON
      {
        test: /\.json$/,
        loader: 'json'
      },
      // CSS
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      // Font
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file'
      },
      // Media
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          // limit for base64 inlining in bytes
          limit: 10000,
          // custom naming format if file is larger than the threshold
          name: '[name].[ext]?[hash]'
        }
      },
    ]
  };

  return config;
};
