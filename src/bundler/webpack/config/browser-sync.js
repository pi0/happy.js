const Config = require('../../../config');

module.exports = function () {
  return {

    // Browser Sync Listening Port
    port: 3000,

    // Reload Delay
    // reloadDelay: 5000,

    // Inject CSS changes
    injectChanges: true,

    // Inject html changes
    // plugins: ["bs-html-injector?files[]=*.html"],

    // Open Browser
    open: false,

    // proxy the Webpack Dev Server endpoint through BrowserSync
    proxy: {
      target: 'http://localhost:' + Config.get('connection.port'),
      ws: true,
    },

    // Attempt to use the URL "http://my-private-site.localtunnel.me"
    // Set to null to disable this
    tunnel: Config.get('tunnel'),

    // Will not attempt to determine your network status, assumes you're ONLINE.
    online: true,

    // Watch the following files, inject changes or refresh
    files: [
      'public/**/*.css',
    ],

  };

};
