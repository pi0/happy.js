const Utils = require('../../../utils');

// https://github.com/vuejs/vue/blob/next/packages/vue-server-renderer/README.md#why-use-bundlerenderer
const createBundleRenderer = require('vue-server-renderer').createBundleRenderer;

function createRenderer(bundle) {
  return createBundleRenderer(bundle, {
    // cache: require('lru-cache')({
    //   max: 1000,
    //   maxAge: 1000 * 60 * 15
    // })
  });
}

module.exports = function (cb) {

  if (Utils.isProd) {
    // Create server renderer from real fs
    const bundlePath = Utils.projectPath('dist/main.js');
    var renderer = createRenderer(fs.readFileSync(bundlePath, 'utf-8'));
    cb(renderer);
  } else {
    const webpack = require('../../bundlers/webpack');
    webpack.onUpdate(function (bundle) {
      // Pass new renderer to callBack each reload
      var renderer = createRenderer(bundle);
      cb(renderer);
    });
  }

};
