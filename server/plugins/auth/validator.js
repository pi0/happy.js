module.exports = function validateFuncFactory(server, options) {

  var validateFunc = function (decoded, request, callback) {
    console.log('Skipping validation...');
    return callback(null, true);
  };

  return validateFunc;
};
