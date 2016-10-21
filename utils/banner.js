require('./colors');

module.exports = function banner(version) {

  let line=grey("-----------------------------------");

  console.log(line);
  console.log('Happy.js (' + (version ? version : 'DEV')+') ッ');
  console.log('Built with ' + red('❤') + ' at Fandogh Labs');
  console.log(line);

};

