const Colors = require('colors');
const Utils = require('../utils');

const action = process.argv[2];

switch (action) {
  case 'dev':
    const Bundler = require('../bundler');
    Bundler();
    break;
  case 'run':
    require(Utils.projectPath(process.argv[3]));
    break;
  default:
    console.log('Usage: '.yellow + process.argv[1] + ' ' + '[run|bundle]'.yellow);
    break;
}
