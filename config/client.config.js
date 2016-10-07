const path = require('path');
const Utils = require('../utils');
const Config = require('../config');

var config = {};

config.root = Utils.projectRoot;
config.entry = [path.resolve(Utils.projectRoot, 'client/client-entry.js')];
config.entry_app = [path.resolve(Utils.projectRoot, 'client/app-entry.js')];
config.public = path.resolve(Utils.projectRoot, 'public');
config.dist = path.resolve(Utils.projectRoot, 'public/dist');
config.dist_app = path.resolve(Utils.projectRoot, 'dist');

config.aliases = {
  // 'element-ui': path.resolve(Utils.projectRoot, 'client/vendor/element-ui'),
  // 'vue': 'vue/dist/vue.js',
};

config.vendor = [
  'vue',
  //'element-ui',
];

config.scripts = {
  vendor: []
};

config.styles = {
  app: [
    'app.scss'
  ],
  vendor: [
  ],
};

// Attempt to use the URL "http://my-private-site.localtunnel.me"
// Set to null to disable this
config.tunnel = null;

module.exports = config;
