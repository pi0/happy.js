import Vue from 'vue'
import Resource from './vue-resource.common';


module.exports = function () {
  Resource(Vue);
  return Resource;
};
