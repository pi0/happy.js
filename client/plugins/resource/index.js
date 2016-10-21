import BasePlugin from '../base';

import Vue from 'vue'
import VueResource from './vue-resource.common';

export default class ResourcePlugin extends BasePlugin {

  init() {
    VueResource(Vue);
    Vue.http.options = this.options;
  }

  provider() {
    return Vue.http;
  }

};

ResourcePlugin.prototype.name = 'resource';
