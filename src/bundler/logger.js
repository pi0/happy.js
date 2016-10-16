var Bus = require('../bus');

// DON'T USE ME DIRECTLY, use event bus instead!
function log(tag, message, color) {
  if (tag instanceof Array)
    tag = tag.join('][');
  var t = tag ? ('[' + tag.toUpperCase() + '] ') : '';
  if (global[color] instanceof Function)
    t = global[color](t);
  console.log(t + message);
}

Bus.subscribe('message', function (m) {
  log(m.tag, m.message, 'blue');
});

Bus.subscribe('webpack::notify', function (m) {
  log(['webpack', m.name], m.action, 'grey');
});
