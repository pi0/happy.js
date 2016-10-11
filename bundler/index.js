var Child = require('child_process');
var Path = require('path');
var Banner = require('../utils/banner');
var Bus = require('./bus');

Bus.name = "bundler";

module.exports = function () {
  Banner();

  var plugins = ['logger', 'webpack'];

  plugins.forEach(path=> {
    const child = Child.fork(Path.resolve(__dirname, 'plugins/' + path));
    Bus.listen(child, path);
  });
};



