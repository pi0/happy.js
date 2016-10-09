const ClientDev = require('./client');
const SSRDev = require('./ssr');
const Colors = require('colors');

module.exports = function (cb) {
  var logPrefix = Colors.red("[DEV] ");

  console.log(logPrefix + "Starting SSR Engine");
  SSRDev(function () {

    console.log(logPrefix + "Starting Client Bundler");
    ClientDev(function () {

      console.log(logPrefix + "Booting Application");
      cb();

    })
  })
};
