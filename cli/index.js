const Colors = require('colors');
const action = process.argv[2];

var show_help = false;

console.log(process.argv[1]);

switch (action) {
  case 'run':
    require('./dev_server');
    break;
  default:
    show_help = true;
    break;
}

if (show_help) {
  console.log('Usage: '.yellow + process.argv[1] + ' ' + '[run|bundle]'.yellow)
}
