const path = require('path');
const Utils = require('../utils');
const Config = require('../config');

var config = {};

config.root = Utils.projectRoot;
config.entry = [path.resolve(Utils.projectRoot, 'client/index.js')];
config.public = path.resolve(Utils.projectRoot, 'public');
config.assets = path.resolve(Utils.projectRoot, 'public/assets');
config.dist = path.resolve(Utils.projectRoot, 'public/dist');
config.dist_app = path.resolve(Utils.projectRoot, 'dist');

config.view = {
  vue: {
    ssr: true,
    template: Utils.projectPath('public/index.html'),
  }
};

config.aliases = {

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
  vendor: [],
};

// Attempt to use the URL "http://my-private-site.localtunnel.me"
// Set to null to disable this
config.tunnel = null;

module.exports = config;
