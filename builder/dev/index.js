const ClientDev = require('./client');
const SSRDev = require('./ssr');

module.exports = function (cb) {
  console.log("[Dev] Starting SSR Engine");
  SSRDev(function () {
    console.log("[Dev] Starting Client Bundler");
    ClientDev(function () {
      console.log("[Dev] Booting Application");
      cb();
    })
  })
};
