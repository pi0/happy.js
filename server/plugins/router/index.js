const AutoRouter = require('./routers/auto');
const AssetRouter = require('./routers/asset');
const ViewRouter = require('./routers/view');

function register(server, options, next) {

  var routers = [
    {
      register: AutoRouter,
      options: {
        routes: options.routes,
      }
    },
    {
      register: AssetRouter,
    },
  ];

  server.register(routers, ()=> {
    server.register({
      register: ViewRouter,
      options: options.view,
    }, next);
  });

}

register.attributes = {
  name: 'HappyRouter',
};

module.exports = register;
