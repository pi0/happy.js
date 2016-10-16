const Bus = require('../../bus');

class WebpackBusPlugin {

  constructor(options) {
    this.options = options;
  }

  notify(action, payload) {
    Bus.emit('webpack::notify', {
      name: this.options.name,
      action,
      payload
    });
  }

  apply(compiler) {
    compiler.plugin('watch-run', (watching, callback)=> {
      this.notify('watch-run', null);
      callback(null, null);
    });

    compiler.plugin('compilation', (d)=> {
      this.notify('compilation', null);
    });

    compiler.plugin('done', (stats)=> {
      this.notify('done', {stats: stats.toJson(),});
    });
  }

}

module.exports = WebpackBusPlugin;
