import Vue from 'vue'
import Resource from 'vue-resource';

module.exports = function () {
  Resource(Vue);
  return Resource;
};
