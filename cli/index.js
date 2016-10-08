const Colors = require('colors');
const action = process.argv[2];

var show_help = true;

console.log(process.argv[1]);

switch (action) {
  case 'run':
    require('./dev_server');
    break;
}

if (show_help) {
  console.log('Usage: '.yellow + process.argv[1] + ' ' + '[run|bundle]'.yellow)
}
