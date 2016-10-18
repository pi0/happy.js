import Vue from 'vue'
import Router from './plugins/router';
import Resource from './plugins/resource';
import Store from './plugins/store';
import {sync} from 'vuex-router-sync';
import VueCookie from './plugins/cookie';

const inBrowser = typeof window !== 'undefined';

function factory(options) {

  // Global Context
  var context = {};

  // Router
  var router = context.router = Router(options.router);

  // Store
  var store = context.store = Store(options.store);

  // Sync Router & Store
  sync(store, router);

  // Resource
  var resource = context.resource = Resource(options.resource);

  // Cookie Support
  var cookie = context.cookie = VueCookie();

  // Auth
  var auth = context.auth = new options.Auth(context);

  // Vue
  var app = context.app = new Vue(Object.assign(context, options.App));

  // App Entry
  const Entry = inBrowser ? require('./entry/client') : require('./entry/app');
  return Entry({app, router, store});
}

export default factory;
