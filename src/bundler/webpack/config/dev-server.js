const Config = require('../../../config');

module.exports = {

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,

  // Control the console log messages shown in the browser when using inline module.
  // Can be `error`, `warning`, `info` or `none`.
  clientLogLevel: "info",

  // webpack-dev-middleware options
  hot: true,
  inline: true,

  // Display nothing to the console
  quiet: true,

  // Display no info to console (only warnings and errors)
  noInfo: true,

  // Switch into lazy mode
  // that means no watching, but recompilation on every request
  lazy: false,


  // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
  // Use "**" to proxy all paths to the specified server.
  // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
  // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
  proxy: {
    "**": "http://localhost:3000"
  },

  // Watch options (only lazy: false)
  // watchOptions: {
  //   aggregateTimeout: 300,
  //   poll: true
  // },

  // The index path for web server
  index: "index.html",

  // Public path to bind the middleware to use the same as in webpack
  // REQUIRED FOR MIDDLEWARE
  publicPath: Config.get('dist.distPath'),

  port: 3001,

  // Options for formatting the statistics
  stats: {
    colors: true
  }

};
