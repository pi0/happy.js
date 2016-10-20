var AutoRouter = require('./routers/auto');
var AssetRouter = require('./routers/asset');

function register(server, options, next) {

  var routers = [AutoRouter, AssetRouter];

  routers.forEach(function (router) {
    server.register(router);
  });

  next();
}

register.attributes = {
  name: 'HappyRouter',
};

module.exports = register;
