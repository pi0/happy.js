const Webpack = require('webpack');
const MFS = require('memory-fs');
const Bus = require('../../../bus');
const SSRConfig = require('../config/ssr');

Bus.name = 'SSR';

const compiler = Webpack(SSRConfig());
compiler.outputFileSystem = new MFS();

var bundles = [];
var subscribed_bundles = [];

Bus.subscribe('bundle::request', name=> {
  if (subscribed_bundles.indexOf(name) === -1)
    subscribed_bundles.push(name);
  let sent = sendBundle(name);
  if (!sent) {
    // TODO : queue
  }
});


compiler.watch({}, (err, stat) => {
  if (err)
    Bus.message(err);

  let assets = stat.compilation.assets;
  Object.keys(assets).forEach(function (name) {
    let source = assets[name]._cachedSource;
    let size = assets[name]._cachedSize;
    bundles[name] = {name, source, size};
    if (subscribed_bundles.indexOf(name) !== -1)
      sendBundle(name);
  });
});

function sendBundle(name) {
  let bundle = bundles[name];
  if (!bundle) return;
  Bus.message('Send ' + green(bundle.name) + grey(' (Size: ' + parseInt(bundle.size / 1024.0) + 'KB)'));
  Bus.emit('bundle:' + name, bundle);
}

