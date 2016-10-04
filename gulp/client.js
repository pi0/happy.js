const Webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const Gulp = require('gulp');
const Gutil = require('gulp-util');
const path = require('path');
const Happier = require('../happier');

/*
 |--------------------------------------------------------------------------
 | Client
 |--------------------------------------------------------------------------
 |
 */

Gulp.task("client", function (cb) {

  // Compile for web browser
  var compilerBrowser = Webpack(Happier.config.get('build.client'));
  compilerBrowser.run(function (err,stats) {
    if(err) throw new Gutil.PluginError("webpack:build-dev", err);
    Gutil.log("[]", stats.toString({
      colors: true
    }));
  });

  // Compile for app
  var compilerApp = Webpack(Happier.config.get('build.app'));
  compilerApp.run(function (err,stats) {
    if(err) throw new Gutil.PluginError("build:build-dev", err);
    Gutil.log("[]", stats.toString({
      colors: true
    }));
  });

  // Webpack Dev Server
  // var devServerConfig = Happier.config.get('build.dev_server');
  // var devServer = new WebpackDevServer(compiler, devServerConfig);
  // devServer.listen(devServerConfig.port, 'localhost', function (err) {
  //   if (err) throw new Gutil.PluginError("webpack-dev-server", err);
  //   cb();
  // });

});
