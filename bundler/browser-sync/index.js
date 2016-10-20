const BrowserSync = require('browser-sync');
const Bus = require('../../bus');
const BrowserSyncConfig = require('./config');

const browserSync = BrowserSync.create();
var init = false;

function notify(msg) {
  browserSync.notify(msg);
  Bus.message(msg);
}

var config = Object.assign({}, BrowserSyncConfig());

Bus.subscribe('webpack::notify', m => {
  switch (m.action) {
    case 'watch-run':
      if (!init) {
        notify('Initializing...');
        browserSync.init(config);
        init = true;
      }
      break;
    case 'compilation':
      notify('Rebuilding...');
      break;
    case 'done':
      notify('Done');
      break;
    default:
  }
});
