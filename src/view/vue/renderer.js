const Utils = require('../../utils');
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;
const Bus = require('../../bus');
const Config = require('../../config');
const LRU = require('lru-cache');
const FS = require('fs');

function createRenderer(bundle) {
  return createBundleRenderer(bundle, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  });
}

module.exports = function (cb) {

  if (Utils.isProd()) {
    // Create server renderer from real fs
    const bundlePath = Utils.projectPath('dist/main.js');
    var renderer = createRenderer(FS.readFileSync(bundlePath, 'utf-8'));
    cb(renderer);
  } else {
    let bundle_name = Config.get('dist').filename_ssr;
    // Subscribe for bundle
    Bus.subscribe('bundle:' + bundle_name, (m)=> {
      let {name, source, size}=m;
      var renderer = createRenderer(source);
      cb(renderer);
    });
    // Request it
    Bus.emit('bundle::request', bundle_name);
  }

};
