const Piping = require('piping');
const Config = require('../../config');
const Bus = require('../bus');

Bus.log("Booting Application");

var pipingConf = {
  main: Config.get('app.entry'),
  ignore: /client|public|resources|storage|.idea|.git/,
};

if (Piping(pipingConf))
  if (cb)cb();
