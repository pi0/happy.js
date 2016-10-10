function register(server, options, next) {
  // Register JWT Strategy
  server.auth.strategy('jwt', 'jwt', 'optional', options);
  //server.auth.default('jwt');

  next();
}

register.attributes = {
  name: 'Happy.Auth'
};

module.exports = register;
