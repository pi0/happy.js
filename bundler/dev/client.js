const Webpack = require('webpack');
const WebpackDevServer = require("webpack-dev-server");
const MFS = require('memory-fs');
const WebpackConfig = require('../config/webpack.config.client');
const WebpackDevServerConfig = require('../config/webpack.dev-server');

console.log("[DEV] " + "Starting Client Bundler");

const webpackDevConfig = WebpackConfig();
webpackDevConfig.entry.vendor.push('webpack-dev-server/client?http://0.0.0.0:' + WebpackDevServerConfig.port);
webpackDevConfig.entry.vendor.push('webpack/hot/dev-server');

const compiler = Webpack(webpackDevConfig);
compiler.outputFileSystem = new MFS();

var devServer = new WebpackDevServer(compiler, WebpackDevServerConfig);

devServer.listen(WebpackDevServerConfig.port, 'localhost', function (err) {
  if (err) console.error(err);
});
