// Based on https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js

module.exports.setup = function (server) {

  const clientCompiler = require('./compilers/client');
  clientCompiler(server,onUpdate);

  const serverCompiler = require('./compilers/server');
  serverCompiler(server,onUpdate);

};

// On Update Hook
var callBacks = [];
function onUpdate(d) {
  console.log("Webpack Reloaded");
  callBacks.forEach(function (callback) {
    callback(d);
  })
}

// Register callBack hook
module.exports.onUpdate = function (cb) {
  callBacks.push(cb);
};
