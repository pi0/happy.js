var Child = require('child_process');
var Path = require('path');
var FS = require('fs');
var Banner = require('../utils/banner');
const Config = require('../config');
var Bus = require('../bus');
const Utils = require('../utils');
const Build = require('./webpack/build');

require('./logger');
Bus.name = "bundler";

Banner();

module.exports.build = Build;

var entry = Config.get('entry_app');
var _app = null;
var watch_lock = false;

module.exports.dev = function dev() {

  reload();
  watch();

  loadplugin('webpack/dev/ssr');
  loadplugin('webpack/dev/client');
  loadplugin('browser-sync');

};

function loadplugin(plugin) {
  const child = Child.fork(Path.resolve(__dirname, plugin));
  Bus.connect(child, plugin);
}

function watch() {
  var watch_dirs = [
    Path.dirname(Config.get('entry_app'))
  ];
  watch_dirs.forEach(dir=>FS.watch(Utils.projectPath(dir), reload));
}

function reload(eventType, filename) {
  if (watch_lock)return;
  watch_lock = true;
  setTimeout(()=>watch_lock = false, 1000);

  if (filename && eventType)
    Bus.message("Reloading app " + green(filename) + " " + eventType);
  else
    Bus.message("Starting app");

  if (_app) _app.kill();
  _app = Child.fork(entry);

  Bus.connect(_app);
}

