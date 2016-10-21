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
  context.app = new Vue(context);

  Object.keys(context).forEach(function (k) {
    context.app[k] = context[k];
  });

  // App Entry
  const Entry = inBrowser ? require('./entry/client') : require('./entry/app');
  Entry.context = context;

  return Entry(context);
}

export default factory;
