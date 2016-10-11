const BrowserSync = require('browser-sync');
const Bus = require('../../bus');
const BrowserSyncConfig = require('./config');

const browserSync = BrowserSync.create('happy.js browser-sync plugin');
var init = false;

var isWebpackWatching = false;

Bus.subscribe('webpack::notify', function (m) {
  switch (m.action) {
    case 'watch-run':
      isWebpackWatching = m.payload;
      if (isWebpackWatching && !init)
        browserSync.init(BrowserSyncConfig);
      break;
    case 'compilation':
      self.browserSync.notify('Rebuilding... ');
      Bus.log(m.payload);
      break;
    case 'done':
      self.browserSync.notify('Done');
      Bus.log(m.payload);
      break;
    default:
  }
});
