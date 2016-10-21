import BasePlugin from '../base';
const inBrowser = typeof window !== 'undefined';

export const SET_COOKIE = 'auth/SET_COOKIE';


export default class CookiePlugin extends BasePlugin {
  // Based on https://github.com/alfhen/vue-cookie/blob/master/src/vue-cookie.js

  init() {
  }

  set(name, value, days) {
    var d = new Date;
    if (inBrowser) {
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    } else {
      this.context.cookies[name] = value;
    }
  }

  get(name) {
    if (inBrowser) {
      var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    } else {
      return this.context.cookies[name];
    }
  }

  remove(name) {
    if (inBrowser) {
      this.set(name, '', -1);
    } else {
      this.set(name, undefined);
    }
  }

};

CookiePlugin.prototype.name = 'cookie';
