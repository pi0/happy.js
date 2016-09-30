const path = require('path');

module.exports = function () {
  return {

    // Used for iframe
    // Can also be an array, or: contentBase: "http://localhost/",
    // contentBase: ClientConfig.project.public,

    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.
    hot: true,

    // Set this as true if you want to access dev server from arbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // Set this if you want to enable gzip compression for assets
    //compress: true,

    // Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
    // Use "**" to proxy all paths to the specified server.
    // This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
    // and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).
    proxy: {
      "**": "http://localhost:3003"
    },

    // Control the console log messages shown in the browser when using inline module.
    // Can be `error`, `warning`, `info` or `none`.
    clientLogLevel: "info",

    // webpack-dev-middleware options
    inline: true,
    quiet: true,
    noInfo: false,
    lazy: false,
    port: 3002,

    // watchOptions: {
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },

    // It's a required option.
    publicPath: '/dist/',

    // headers: {"X-Custom-Header": "yes"},

    stats: {colors: true}

  };
};

