const AutoRouter = require('./routers/auto');
const AssetRouter = require('./routers/asset');
const ViewRouter = require('./routers/view');

function register(server, options, next) {

  var routers = [
    {
      register: AutoRouter,
      options,
    },
    {
      register: AssetRouter,
    },
    {
      register: ViewRouter,
      options: options.view,
    },
  ];

  server.register(routers, next);
}

register.attributes = {
  name: 'HappyRouter',
};

module.exports = register;
