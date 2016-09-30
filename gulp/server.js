const Gulp = require('gulp');
const Gutil = require('gulp-util');
const Nodemon = require('gulp-nodemon');
const BrowserSync = require('browser-sync');
const Babel = require('gulp-babel');
const Cache = require('gulp-file-cache');
const Happier = require('../happier');
const Webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Compile
 |--------------------------------------------------------------------------
 |
 */

var __compile_cache = null;

Gulp.task('compile', function () {

  // Initialize compile cache
  if (__compile_cache == null)
    __compile_cache = new Cache();

  // Project ES2015 Source code
  var stream = Gulp.src(Happier.config.get('app.project.src'));

  // Remember files
  stream.pipe(__compile_cache.filter());

  // Compile new ones
  stream.pipe(Babel(Happier.config.get('app.babel')));

  // Cache them
  stream.pipe(__compile_cache.cache());

  // Write them
  stream.pipe(Gulp.dest(Happier.config.get('app.project.dist')));

  // important for gulp-nodemon to wait for completion
  return stream;
});

/*
 |--------------------------------------------------------------------------
 | Bundle (Beta)
 |--------------------------------------------------------------------------
 |
 */

Gulp.task('bundle', function (cb) {
  console.log("WARN: BUNDLE FEATURE IS STILL IN BETA!!");
  Webpack(Happier.config.get('webpack.server'),function(err, stats) {
    if(err) throw new Gutil.PluginError("webpack", err);
    Gutil.log("[webpack]", stats.toString({
      color:true,
      chunks:false,
    }));
    cb();
  });
});

/*
 |--------------------------------------------------------------------------
 | Server
 |--------------------------------------------------------------------------
 |
 */

Gulp.task('server', ['compile'], function () {

  var stream = Nodemon(Happier.config.get('app.nodemon'));

  // Handle Server Start
  stream.on('start', function onStart() {
    // Script started
  });

  // Handle Server Restart
  stream.on('restart', function onRestart() {

    // Reload connected browsers after a slight delay
    setTimeout(function () {
      BrowserSync.reload({
        stream: false
      });
    }, 1000);

  });

  // Handle Server Crashes
  stream.on('crash', function () {
    console.error('Application has crashed!\n');
    stream.emit('restart', 10);  // restart the server in 10 seconds
  });

  return stream;
});

