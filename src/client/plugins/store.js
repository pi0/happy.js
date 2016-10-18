import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

module.exports = function (d) {
  return new Vuex.Store(Object.assign({
    state: {
      token: false,
      route: {},
    },
  }, d));
};
