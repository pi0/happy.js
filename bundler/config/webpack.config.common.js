const path = require('path');
const Config = require('../../config');

module.exports = function () {

  var config = {};

  // Resolver config
  config.resolve = {
    extensions: ['.js', '.vue'],
    alias: Config.get('client.aliases'),
  };

  config.devtool = '#eval';

  // Enable watch
  config.watch = true;
  config.watchOptions = {
    aggregateTimeout: 3000,
    poll: 2000,
    watchDelay:2000,
  };

  config.output = {
    // Change WebpackJsonp function
    jsonpFunction: '_jsp',
  };

  config.plugins = [];

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
      // SCSS
      {
        test: /\.scss$/,
        loader: 'css-loader!postcss-loader!sass-loader'
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
