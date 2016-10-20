const Validator= require('./validator');

function register(server, options, next) {

  // Setup ValidateFunc
  if (!options.validateFunc) {
    options.validateFunc = Validator(server, options);
  }

  // Register JWT Strategy
  server.auth.strategy('jwt', 'jwt', 'optional', options);

  // No need to set default
  //server.auth.default('jwt');

  next();
}

register.attributes = {
  name: 'happy.auth'
};

module.exports = register;
