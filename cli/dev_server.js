const Piping = require("piping");
const Config = require('../config');
const DevTools = require('../builder/dev');

DevTools(function () {
if (!Piping(
    {
      main: Config.get('app.entry'),
      ignore: /client|public|resources|storage|.idea|.git/,
    }
  )) return;
});



