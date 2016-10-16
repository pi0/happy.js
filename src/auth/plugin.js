function register(server, options, next) {
  // Register JWT Strategy
  server.auth.strategy('jwt', 'jwt', 'optional', options);
  //server.auth.default('jwt');
  next();
};


// TODO: add dependency to H2O2
register.attributes = {
  name: 'happy.auth'
};

module.exports = register;
