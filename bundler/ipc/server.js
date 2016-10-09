const ipc = require('node-ipc');
ipc.config = require('./config')('bundler');

ipc.serve(function () {

  ipc.server.on('handle', function (data, socket) {
    console.log(data);
    //ipc.server.emit(socket, 'message', data + ' world!');
  });

  ipc.server.on('connect', function (socket) {

    if (_bundles['ssr']) {
      ipc.server.emit(socket, 'bundle', {id: 'ssr', data: _bundles['ssr']});
    } else {
      // TODO: Queue socket for new bundle
    }

  });

  ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
    //Client has disconnected!
  });

});

ipc.server.start();

var _bundles = {};

function bundle(id, data) {
  ipc.server.broadcast('bundle', {id, data});
  _bundles[id] = data;
}
module.exports.bundle = bundle;
