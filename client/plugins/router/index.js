import BasePlugin from '../base';

import VueRouter from 'vue-router';
import Vue from 'vue';

export default class RouterPlugin extends BasePlugin {

  init() {
    Vue.use(VueRouter);

    let routerOptions = {
      routes: this.options.routes,
      mode: 'history',
    };

    this.router = new VueRouter(routerOptions);
  }

  provider(){
    return this.router;
  }

};

RouterPlugin.prototype.name = 'router';
