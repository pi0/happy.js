const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

const Utils = require('../../../../../../utils');
const Bus = require('../../../../../../bus');
const Config = require('../../../../../../config');

const LRU = require('lru-cache');
const FS = require('fs');

// It is recommended to set VUE_ENV=server this will help rendering performance, by turning data observation off.
process.env.VUE_ENV='server';

module.exports = function (cb) {

  let bundle_name = Config.get('dist.filename_ssr');

  if (Utils.isProd()) {

    // Create server renderer from real fs
    const bundlePath = Utils.projectPath('dist/' + bundle_name);
    var renderer = createRenderer(FS.readFileSync(bundlePath, 'utf-8'));
    cb(renderer);

  } else {

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


function createRenderer(bundle) {
  return createBundleRenderer(bundle, {
    cache: LRU({
      max: 1000,
      maxAge: 1000 * 60 * 15
    })
  });
}
