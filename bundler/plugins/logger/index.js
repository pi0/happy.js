var Bus = require('../../bus');
Bus.name='Logger';

Bus.subscribe('log', function (m) {
  var prefix = m.prefix ? ('[' + m.prefix + '] ') : '';
  console.log(prefix.red + m.message);
});

Bus.subscribe('webpack', function (m) {
  console.log(m.name + ' ' + m.action, 'webpack');
});
