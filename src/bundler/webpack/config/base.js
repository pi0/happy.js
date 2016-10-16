const Webpack = require('webpack');
const Config = require('../../../config');
const Utils = require('../../../utils');
const Path = require('path');

module.exports = function (options) {

  // Start With a New Config
  var config = Object.assign({
    plugins: [],
  }, options);

  // Resolver config
  config.resolve = {
    extensions: ['.js', '.vue'],
    alias: Config.get('aliases'),
  };

  config.resolveLoader = {
    modules: [
      Path.resolve(Utils.projectRoot, "node_modules"),
      Path.resolve(Utils.libRoot, "../node_modules"),
    ]
  };


// Basic output config
  config.output = {
    path: Config.get('dist').path,
    jsonpFunction: '_jsp', // Change WebpackJsonp function
  };

// Config Module Loaders
  config.module = {

    loaders: [
      // Vue
      {
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
        loader: 'postcss!css',
      },
      // SCSS
      {
        test: /\.scss$/,
        loader: 'postcss!sass'
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
      // Node
      {
        test: /\.node$/,
        loader: "node-loader"
      },
    ]
  };

  if (!Utils.isProd()) { // Development Config

    // Enable watch
    config.watch = true;
    config.watchOptions = {
      aggregateTimeout: 3000,
      poll: 2000,
      watchDelay: 2000,
    };

    // Eval source maps are so fast and also available inside bundles :)
    config.devtool = '#eval';

    // Bus Plugin
    const BusPlugin = require('../webpack-bus-plugin');
    config.plugins.push(new BusPlugin({name: options.name}));

  } else { // Production Config

    // Pass build environment inside bundle
    // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
    config.plugins.push(new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }));

    // This is needed in Webpack 2 for minifying CSS
    config.plugins.push(new Webpack.LoaderOptionsPlugin({minimize: true}));

  }

  return config;
}
;