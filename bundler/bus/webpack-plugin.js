const Bus = require('./index');

var BusPlugin = module.exports = function (options) {
  var self = this;

  self.options = Object.assign({name: 'default', options});
};

BusPlugin.prototype.emit = function (action, payload) {
  var self = this;
  Bus.emit('webpack', {
    name: self.options.name,
    action,
    payload
  });
};

BusPlugin.prototype.apply = function (compiler) {
  var self = this;

  compiler.plugin('watch-run', function (watching, callback) {
    self.emit('watch-run', watching);
    callback(null, null);
  });

  compiler.plugin('compilation', function (d) {
    self.emit('compilation', d);
  });

  compiler.plugin('done', function (stats) {
    self.emit('done', {
      stats: stats.toJson(),
    });
  });

};
