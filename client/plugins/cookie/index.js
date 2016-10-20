import BasePlugin from '../base';

export default class CookiePlugin extends BasePlugin {
  // Based on https://github.com/alfhen/vue-cookie/blob/master/src/vue-cookie.js

  set(name, value, days) {
    var d = new Date;
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
    window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
  }

  get(name) {
    var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return v ? v[2] : null;
  }

  remove(name) {
    this.set(name, '', -1);
  }

};

CookiePlugin.prototype.name = 'cookie';
