const isProd = process.env.NODE_ENV === 'production';

const fs = require('fs');
const path = require('path');
const Utils = require('../../../utils');

module.exports = function (path) {

  var template = fs.readFileSync(path, 'utf-8');
  var i = template.indexOf('{{ APP }}');

  // Styles are injected dynamically via vue-style-loader in development
  var style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : '';

  return {
    head: template.slice(0, i).replace('{{ STYLE }}', style),
    tail: template.slice(i + '{{ APP }}'.length)
  };


};
