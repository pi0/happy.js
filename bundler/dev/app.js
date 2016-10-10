const Piping = require('piping');
const Config = require('../../config');

console.log("[DEV] " + "Booting Application");

var pipingConf = {
  main: Config.get('app.entry'),
  ignore: /client|public|resources|storage|.idea|.git/,
};

if (Piping(pipingConf))
  if (cb)cb();
