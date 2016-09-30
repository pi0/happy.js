module.exports = function () {
  return {

    // Browser Sync Listening Port
    port: 3000,

    // Reload Delay
    reloadDelay: 500,

    // Inject CSS changes
    injectChanges: true,

    // Inject html changes
    plugins: ["bs-html-injector?files[]=*.html"],

    // Open Browser ?
    open: false,

    // Change the default weinre port
    ui: {
      port: 3001,
      weinre: {
        port: 2999
      }
    },

    // proxy the Webpack Dev Server endpoint through BrowserSync
    proxy: {
      target: 'http://localhost:3002/webpack-dev-server/',
      // serveStatic: [ClientConfig.project.public],
      ws: true,
    },

    // Attempt to use the URL "http://my-private-site.localtunnel.me"
    // Set to null to disable this
    tunnel: ClientConfig.tunnel,

    // Will not attempt to determine your network status, assumes you're ONLINE.
    online: true,

    // Watch the following files, inject changes or refresh
    files: [
      'public/**/*.css',
    ],

  };
};


