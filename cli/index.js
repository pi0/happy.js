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
  case 'run':
    require(Utils.projectPath(process.argv[3]));
    break;
  default:
    console.log('Usage: '.yellow + process.argv[1] + ' ' + '[run|bundle]'.yellow);
    break;
}
