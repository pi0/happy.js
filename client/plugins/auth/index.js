import BasePlugin from '../base';

export default class AuthPlugin extends BasePlugin {

  init() {
    this.user = null;
  }

  login() {

  }

  check() {

  }

  logout() {

  }


};

AuthPlugin.prototype.name = 'auth';
