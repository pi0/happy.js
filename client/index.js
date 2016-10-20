import Vue from 'vue'

const inBrowser = typeof window !== 'undefined';

function factory(options) {

  // Global Context
  var context = {};

  // Install Plugins
  options.plugins.forEach(function (plugin) {
    new plugin.register(context, plugin.options);
  });

  // Vue
  context.app = new Vue(Object.assign(context, options.app));

  // App Entry
  const Entry = inBrowser ? require('./entry/client') : require('./entry/app');

  return Entry(context);
}

export default factory;
