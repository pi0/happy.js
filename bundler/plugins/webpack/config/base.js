const Webpack = require('webpack');
const Config = require('../../../../config');
const Utils = require('../../../../utils');

module.exports = function (options) {

  // Start With a New Config
  var config = Object.assign({
    plugins: [],
  }, options);

  // Resolver config
  config.resolve = {
    extensions: ['.js', '.vue'],
    alias: Config.get('client.aliases'),
  };

  // Basic output config
  config.output = {
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
        loader: 'postcss!css!sass'
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

  // Config Vue style loader
  config.plugins.push(new Webpack.LoaderOptionsPlugin({
    options: {
      vue: {
        loaders: {
          // vue-style is a fork of style-loader,
          // this is a dependency of vue-loader
          // fixing the issue that root-relative URLs are interpreted against chrome:// urls.
          'scss': 'vue-style!css!sass', // This will match all <style lang=scss> tags
          fallbackLoader: "vue-style!css",
        }
      }
    }
  }));


  if (!Utils.isProd) { // Development Config

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
    const BusPlugin = require('../../../bus/webpack-plugin');
    config.plugins.push(new BusPlugin({id: options.id}));

  } else { // Production Config

    // Pass build environment inside bundle
    // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
    config.plugins.push(new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }));

    // This is needed in Webpack 2 for minifying CSS
    config.plugins.push(new Webpack.LoaderOptionsPlugin({minimize: true}));

    // Minify with dead-code elimination
    config.plugins.push(new Webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}));

    // NoErrors
    config.plugins.push(new Webpack.NoErrorsPlugin());

    // Optimize module ids by occurence count
    config.plugins.push(new Webpack.optimize.OccurenceOrderPlugin());

  }

  return config;
};
