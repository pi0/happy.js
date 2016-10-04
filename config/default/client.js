const path = require('path');
const Utils = require('../../utils');
const Config = require('../../config');

var config = {};

module.exports = function () {

  config.project = {
    root: Utils.projectRoot,
    entry: path.resolve(Utils.projectRoot, 'resources/assets/js/client-entry.js'),
    entry_app: path.resolve(Utils.projectRoot, 'resources/assets/js/app-entry.js'),
    public: path.resolve(Utils.projectRoot, 'public'),
    dist: path.resolve(Utils.projectRoot, 'public/dist'),
    dist_app: path.resolve(Utils.projectRoot, 'dist'),
    aliases: {
      'components': path.resolve(Utils.projectRoot, 'resources/assets/js/components'),
      'js': path.resolve(Utils.projectRoot, 'resources/assets/js'),
      'vendor': path.resolve(Utils.projectRoot, 'resources/vendor'),
      'element-ui': path.resolve(Utils.projectRoot, 'resources/assets/vendor/element-ui/lib'),
    },
    vendor: [
      'vue',
      'element-ui',
    ],
  };

  config.scripts = {
    vendor: []
  };

  config.styles = {
    app: [
      'app.scss'
    ],
    vendor: [
      'resources/assets/vendor/' + 'element-ui/lib/theme-default/*.css',
    ]
  };

  // Attempt to use the URL "http://my-private-site.localtunnel.me"
  // Set to null to disable this
  config.tunnel = null;

  return config;
};
