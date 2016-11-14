import VueRouter from 'vue-router';
import Vue from 'vue';

import BasePlugin from '../base';

import DefaultError from './errors/default.vue';
import ClientRoutes from './routes'

export default class RouterPlugin extends BasePlugin {

  init() {

    // Register VueRouter on Vue
    Vue.use(VueRouter);

    // Create a new router
    let routerOptions = {
      routes: ClientRoutes,
      mode: 'history',
    };

    // Default Page
    routerOptions.routes.push({path: '*', component: DefaultError});

    this.router = new VueRouter(routerOptions);

    //router.beforeEach(() =>window.scrollTo(0, 0));

    // Set Default Renderer
    this.context.render = createElement=>createElement('router-view');

  }

  provider() {
    return this.router;
  }

};

RouterPlugin.prototype.name = 'router';
