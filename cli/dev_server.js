const Piping = require("piping");
const Config = require('../config');
const DevTools = require('../bundler/dev');

DevTools(function () {
if (!Piping(
    {
      main: Config.get('app.entry'),
      ignore: /client|public|resources|storage|.idea|.git/,
    }
  )) return;
});



