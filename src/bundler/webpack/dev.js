const Webpack = require('webpack');
const MFS = require('memory-fs');
const Bus = require('../../bus');
const BrowserSync = require('./browser-sync');
const ClientConfig = require('./config/client');
const SSRConfig = require('./config/ssr');
const DevServerConfig = require('./config/dev-server');
const WebpackDevMiddleware = require("webpack-dev-middleware");

Bus.name = 'Webpack';

const compiler = Webpack([ClientConfig(), SSRConfig()]);
compiler.outputFileSystem = new MFS();

var webpackMiddleware = WebpackDevMiddleware(compiler, DevServerConfig);

BrowserSync(webpackMiddleware);

var bundles = [];
var subscribed_bundles = [];

compiler.watch({}, (err, stats) => {
  if (err)
    Bus.message(err);

  stats.stats.forEach(function (stat) {
    let assets = stat.compilation.assets;
    Object.keys(assets).forEach(function (name) {

      let source = assets[name]._cachedSource;
      let size = assets[name]._cachedSize;
      bundles[name] = {name, source, size};

      Bus.message('Bundle ' + green(name) + grey(' (Size: ' + parseInt(size / 10.24) * 100 + 'KB)'));

      if (subscribed_bundles.indexOf(name) !== -1)
        sendBundle(name);
    });
  });
});

function sendBundle(name) {
  let bundle = bundles[name];
  if (!bundle) return;
  Bus.message('Sending bundle ' + green(name) + grey(' (Size: ' + parseInt(bundle.size / 10.24) * 100 + 'KB)'));
  Bus.emit('bundle:' + name, bundle);
}

Bus.subscribe('bundle::request', name=> {
  if (subscribed_bundles.indexOf(name) === -1)
    subscribed_bundles.push(name);
  let sent = sendBundle(name);
  if (!sent) {
    Bus.message("Requested bundle " + name + " is not available now!");
    // TODO : queue
  }
});


