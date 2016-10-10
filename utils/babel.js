// The require hook will bind itself to node’s require and automatically compile files on the fly
// https://babeljs.io/docs/usage/require/
require('babel-register')({
  "presets": ["es2015"]
});
