const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const Config = require('../../../config');

module.exports = function () {

  return {

    // Entry-point of our application
    entry: {
      app: Config.get('client.project.entry'),
      vendor: Config.get('client.project.vendor'),
    },

    // Where to place the compiled bundle
    output: {
      publicPath: '/dist/',
      path: Config.get('client.project.dist'),
    },

    // Resolver config
    resolve: {
      extensions: ['', '.js', '.vue'],
      alias: Config.get('client.project.aliases'),
    },

    plugins:[],
    // plugins: [
    //
    //   // vue-loader configurations
    //   new webpack.LoaderOptionsPlugin({
    //     vue: {
    //
    //       // Configure autoprefixer
    //       autoprefixer: {
    //         browsers: ['last 2 versions']
    //       },
    //
    //       // Loaders
    //       loaders: {
    //         scss: ExtractTextPlugin.extract({
    //           loader: "css-loader!scss-loader",
    //           fallbackLoader: "vue-style-loader" // <- this is a dep of vue-loader
    //         })
    //       },
    //     }
    //   }),
    // ],

    module: {
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
    },

  }
};
