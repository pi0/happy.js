const ipc = require('node-ipc');
ipc.config = require('./config')('client');

ipc.connectTo('bundler', function () {
  ipc.of.bundler.on('bundle', function (bundle) {
    //console.log('[IPC Client] Bundle Downloaded');
    onBundle(bundle.data);
  });
});

// On Update Hook
var callBacks = [];
function onBundle(d) {
  callBacks.forEach(function (callback) {
    callback(d);
  })
}

// Register callBack hook
module.exports.onBundle = function (cb) {
  callBacks.push(cb);
};
