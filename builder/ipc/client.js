const ipc = require('node-ipc');
ipc.config = require('./config')('client');

ipc.connectTo('builder', function () {
    ipc.of.builder.on('bundle', function (bundle) {
        console.log('New ' + bundle.id + ' bundle');
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
