const ClientConfig = require('./config/client');
const SSRConfig = require('./config/ssr');
const ServerConfig = require('./config/server');
const Bus = require('../../bus');
const Webpack = require('webpack');

module.exports = function (cb) {

  // Sent process env to production
  process.env.NODE_ENV = 'production';

  // Create compiler
  const compiler = Webpack([
    ClientConfig(),
    SSRConfig(),
    // ServerConfig(),
  ]);

  // Run once
  compiler.run((err, stats)=> {
    Bus.message(stats);
    Bus.emit("bundle:build",stats);
    if(cb) cb(stats);
  });

};
