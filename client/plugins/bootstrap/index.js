import BasePlugin from '../base';

import Vue from 'vue';
import  BootstrapVue from 'bootstrap-vue';

export default class BootstrapPlugin extends BasePlugin {

  init() {
    BootstrapVue(Vue);
  }

};

BootstrapPlugin.prototype.name = 'bootstrap_vue';
