import Vue from 'vue'
import Router from './router';
import Resource from './resource';
import Store from './store';

const inBrowser = typeof window !== 'undefined';

function factory(options) {
  var router = Router(options.router);
  var resource = Resource(options.resource);
  var store = Store(options.store);

  var vue = Object.assign({router, resource, store}, options.app);
  var app = new Vue(vue);

  const Entry = inBrowser ? require('./entry/client') : require('./entry/app');
  var entry = Entry({app, router, store});

  // Inject refs to entry
  entry.options = options;
  entry.router = router;
  entry.resource = resource;
  entry.store = store;
  entry.app = app;

  return entry;
}

export default factory;
