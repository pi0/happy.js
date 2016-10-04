const webpack = require('webpack');
const MFS = require('memory-fs');
const Path = require('path');
const Config = require('../../../../config');
const HapiWebpackDevMiddleware = require('../middleware/hapi-webpack-dev-middleware');
const HapiWebpackHotMiddleware = require('../middleware/hapi-webpack-hot-middleware');

module.exports = function (server, onUpdate) {

  const clientConfig = Config.get('webpack.client');

  // Setup on the fly compilation + hot-reload
  clientConfig.entry.app = [
    clientConfig.entry.app,
    'webpack-hot-middleware/client'
  ];
  clientConfig.plugins = [];
  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );

  // Register Middlewares
  server.register([
    {
      register: HapiWebpackDevMiddleware,
      options: {
        config: clientConfig,
        options: {
          noInfo: true,
          publicPath: clientConfig.output.publicPath,
          stats: {
            colors: true,
            chunks: false,
          }
        }
      }
    },
    {
      register: HapiWebpackHotMiddleware
    }
  ], function (err) {
    if (err) throw err;
  });

};
