import BasePlugin from '../base';

import VueRouter from 'vue-router';
import Vue from 'vue';
import DefaultError from './errors/default.vue';

export default class RouterPlugin extends BasePlugin {

  init() {

    // Register VueRouter on Vue
    Vue.use(VueRouter);

    // Create a new router
    let routerOptions = {
      routes: this.options.routes ? this.options.routes : [],
      mode: 'history',
    };

    // Default Page
    routerOptions.routes.push({path: '*', component: DefaultError});

    this.router = new VueRouter(routerOptions);

    // Set Default Renderer
    this.context.render = createElement=>createElement('router-view');

  }

  provider() {
    return this.router;
  }

};

RouterPlugin.prototype.name = 'router';
