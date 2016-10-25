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
  case '--help':
    console.log(grey('Usage: ') + yellow('[dev|build|start]'));
    process.exit();
    break;
  default:
    Bundler.build(stats=> {
        require(Utils.projectPath('src/server'));
    });
    break;
}
