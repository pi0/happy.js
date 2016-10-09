import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

module.exports = function (router) {
  return new VueRouter({
    routes: router.routes,
    mode: 'history',
  });
};
