// https://github.com/bjrmatos/browser-sync-webpack-plugin/blob/master/index.js
var browserSync = require('browser-sync');

function Plugin(options) {
  var self = this;
  self.options = options;
  self.webpackIsWatching = false;
  self.browserSyncIsRunning = false;
  self.browserSync = browserSync;
}

Plugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('watch-run', function (watching, callback) {
    self.webpackIsWatching = true;
    callback(null, null);
  });

  compiler.plugin('done', function (stats) {
    if (self.webpackIsWatching) {
      if (self.browserSyncIsRunning) {
        self.browserSync.reload();
      } else {
        self.browserSync(self.options);
        self.browserSyncIsRunning = true;
      }
    }
  });
};

module.exports = Plugin;
