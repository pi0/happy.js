const Config = require('../../../config');

module.exports = function () {
  return {

    // Browser Sync Listening Port
    port: 3001,

    // Reload Delay
    // reloadDelay: 5000,

    // Inject CSS changes
    injectChanges: true,

    // Inject html changes
    // plugins: ["bs-html-injector?files[]=*.html"],

    // Open Browser
    open: false,

    // Change the default weinre port
    ui: {
      port: 3002,
      weinre: {
        port: 3003
      }
    },

    // proxy the Webpack Dev Server endpoint through BrowserSync
    proxy: {
      target: 'http://localhost:' + Config.get('app.connection.port'),
      // serveStatic: [ClientConfig.public],
      ws: true,
    },

    // Attempt to use the URL "http://my-private-site.localtunnel.me"
    // Set to null to disable this
    tunnel: Config.get('client.tunnel'),

    // Will not attempt to determine your network status, assumes you're ONLINE.
    online: true,

    // Watch the following files, inject changes or refresh
    files: [
      'public/**/*.css',
    ],

  };

};
