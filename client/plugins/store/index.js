import BasePlugin from '../base';

import Vuex from 'vuex'
import Vue from 'vue'

export default class StorePlugin extends BasePlugin {

  init() {
    Vue.use(Vuex);

    var state = {
      state: {
        token: false,
        route: {},
      },
    };

    this.store = new Vuex.Store(Object.assign(state, this.options.state));
  }

  provider(){
    return this.store;
  }


};

StorePlugin.prototype.name = 'store';
