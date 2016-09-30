const Webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const path = require('path');
const Happier = require('../happier');

/*
 |--------------------------------------------------------------------------
 | Client Webpack
 |--------------------------------------------------------------------------
 |
 */

Gulp.task("client", function (cb) {

  // Webpack compiler
  var compiler = Webpack(Happier.config.get('webpack.client'));

  // Webpack Dev Server
  var devServerConfig = Happier.config.get('webpack.dev_server');
  var devServer = new WebpackDevServer(compiler, devServerConfig);
  devServer.listen(devServerConfig.port, 'localhost', function (err) {

    if (err) throw new Gutil.PluginError("webpack-dev-server", err);
    cb();

  });

});
