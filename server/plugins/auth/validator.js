module.exports = function validateFuncFactory(server, options) {

  var validateFunc = function (decoded, request, callback) {
    if (options.validator)
      return options.validator(decoded, request, callback);
    return callback(null, true);
  };

  return validateFunc;
};
