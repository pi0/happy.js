import Vue from 'vue'

const inBrowser = typeof window !== 'undefined';

inBrowser && Vue.use(require('vue-resource'));

module.exports = function () {

};

