const Piping = require("piping");
const Config = require('../config');

require('../builder/dev/client');
require('../builder/dev/ssr');

if (!Piping({

    main: Config.get('app.entry'),
    ignore: /client|public|resources|storage|.idea|.git/,

  })) return;
