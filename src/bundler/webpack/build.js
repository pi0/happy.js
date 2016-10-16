const ClientConfig = require('./config/client');
const SSRConfig = require('./config/ssr');
const AppConfig = require('./config/app');
const Bus = require('../../bus');
const Webpack = require('webpack');

Bus.name = 'Builder';

module.exports = function () {

  // Sent process env to production
  process.env.NODE_ENV = 'production';

  // Create compiler
  const compiler = Webpack([
    ClientConfig(),
    SSRConfig(),
    // AppConfig(),
  ]);

  // Run once
  compiler.run((err, stats)=> {
    Bus.message(err);
    Bus.message(stats);
    Bus.message('Done!');
  });

};