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
    modules: [
      Path.resolve(Utils.projectRoot, ""),
      Path.resolve(Utils.projectRoot, "node_modules"),
      Path.resolve(Utils.libRoot, "node_modules"),
    ]
  };

  config.resolveLoader = {
    modules: config.resolve.modules
  };

  // Basic output config
  config.output = {
    path: Config.get('dist.path'),
    publicPath: '/dist/',
    jsonpFunction: '_jsp_', // Change Webpack jsonp function
  };

  // Config Module Loaders
  config.module = {

    // avoid webpack shimming process
    noParse: /es6-promise\.js$/,

    rules: [
      // Vue
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // Vue HTML
      {
        test: /\.html$/,
        loader: 'vue-html-loader'
      },
      // JS
      {
        test: /\.js$/,
        loader: 'buble-loader',
        // important: exclude files in node_modules, otherwise it's going to be really slow!
        exclude: /node_modules|dist/,
        options: {
          objectAssign: 'Object.assign'
        }
      },
      // JSON
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      // CSS
      {
        test: /\.css$/,
        loader: 'postcss-loader!css-loader?-svgo',
      },
      // SCSS
      {
        test: /\.scss$/,
        loader: 'postcss-loader!sass-loader?-svgo'
      },
      // Font
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      // Media
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
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

    // Source maps
    if (options.name != 'ssr')
      config.devtool = '#eval-source-map';
    else
      config.devtool = '#eval';

    // Bus Plugin
    const BusPlugin = require('../webpack-bus-plugin');
    config.plugins.push(new BusPlugin({name: options.name}));

  } else { // Production Config

    // Source maps
    if (options.name != 'ssr')
      config.devtool = '#cheap-source-map';

    // Pass build environment inside bundle
    // This will Strip comments in Vue code & hort-circuits all Vue.js warning code
    config.plugins.push(new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }));

    // Minify with dead-code elimination
    if (options.name != 'ssr')
      config.plugins.push(new Webpack.optimize.UglifyJsPlugin({
        compress: {warnings: false},
        sourceMap: true,
        keep_fnames: true,
      }));

    // The UglifyJsPlugin will no longer put loaders into minimize mode, and the debug option has been deprecated.
    config.plugins.push(new Webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }));

  }

  return config;
}
;
