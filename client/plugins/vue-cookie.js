/***
 * Vue cookie for happy.js
 * Based on https://github.com/alfhen/vue-cookie/blob/master/src/vue-cookie.js
 */

module.exports = function () {
  return {

    set: function (name, value, days) {
      var d = new Date;
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },

    get: function (name) {
      var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return v ? v[2] : null;
    },

    delete: function (name) {
      this.set(name, '', -1);
    }

  }
};
