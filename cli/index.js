const Utils = require('../utils');
const Bundler = require('../bundler');

const action = process.argv[2];

switch (action) {
  case 'dev':
    Bundler.dev();
    break;
  case 'build':
    Bundler.build();
    break;
  case 'start':
    require(Utils.projectPath('src/server'));
    break;
  default:
    console.log(yellow('Usage: ') + yellow('[run|bundle]'));
    process.exit();
    break;
}
