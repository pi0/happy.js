import BasePlugin from '../base';

import {sync} from 'vuex-router-sync';

export default class SyncPlugin extends BasePlugin {

  init() {
    let store = this.context.store;
    let router = this.context.router;

    sync(store, router)
  }

};

SyncPlugin.prototype.name = 'sync';
