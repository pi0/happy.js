const Vision = require('vision');
// const Path = require('path');
const Config = require('../config');
const VueEngine = require('./engines/vue');

module.exports = function (server) {

  //
  var view = {};

  // Setup Webpack
  const webpack = require('./bundlers/webpack');
  webpack.setup(server);

  // View Engines
  view.engines = {};

  // Setup Vue
  view.engines.vue = VueEngine('public/index.html');

  // Setup Vision
  server.register(Vision, function (err) {
    if (err) {
      console.log("Failed to load vision.");
    }
    // TODO
  });

  return view;
};
