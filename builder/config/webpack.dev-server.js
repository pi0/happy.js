const path = require('path');
const Config = require('../../config');

module.exports = {

  contentBase: Config.get('client.public'),

  // Set this as true if you want to access dev server from arbitrary url.
  // This is handy if you are using a html5 router.
  historyApiFallback: true,

  // Control the console log messages shown in the browser when using inline module.
  // Can be `error`, `warning`, `info` or `none`.
  clientLogLevel: "info",

  // webpack-dev-middleware options
  hot: true,
  inline: true,
  quiet: true,
  noInfo: false,
  lazy: false,
  port: 3019,

  // It's a required option.
  publicPath: '/dist/',

  stats: {
    colors: true
  }

}
;
