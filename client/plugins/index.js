import BasePlugin from './base';

import RouterPlugin from './router';
import ResourcePlugin from './resource';
import StorePlugin from './store';
import CookiePlugin from './cookie';
import SyncPlugin from './sync';
import AuthPlugin from './auth';

export default class extends BasePlugin {

  init() {
    new RouterPlugin(this.context, this.options.router);
    new StorePlugin(this.context, this.options.store);
    new SyncPlugin(this.context, this.options.sync);
    new ResourcePlugin(this.context, this.options.resource);
    // new CookiePlugin(this.context, this.options.cookie);
    //new AuthPlugin(this.context, this.options.auth);
    // new BootstrapPlugin(this.context, this.options.bootstrap);
  }

};

BasePlugin.prototype.name = 'base';
