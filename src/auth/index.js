var people = { // our "users database"
  1: {
    id: 1,
    name: 'Jen Jones'
  }
};

// bring your own validation function
var validate = function (decoded, request, callback) {

  // do your checks to see if the person is valid
  if (!people[decoded.id]) {
    return callback(null, false);
  }
  else {
    return callback(null, true);
  }
};


module.exports = {
  validate
};
