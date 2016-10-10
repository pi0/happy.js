const Colors = require('colors');
const Utils = require('../utils');

const action = process.argv[2];

switch (action) {
  case 'dev':
    const Dev=require('../bundler/dev');
    Dev.init();
    break;
  case 'run':
    require('../utils/babel');
    require(Utils.projectPath(process.argv[3]));
    break;
  default:
    console.log('Usage: '.yellow + process.argv[1] + ' ' + '[run|bundle]'.yellow);
    break;
}
