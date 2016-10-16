const Path = require('path');
var windows = process.platform.indexOf("win") === 0;

// Project Root
//const projectRoot = Path.dirname(Path.resolve(__dirname).split('happy.js')[0]);
const projectRoot = process.cwd();
module.exports.projectRoot = projectRoot;

// Project Path
function projectPath(path) {
  return Path.resolve(projectRoot, path).replace(/\\/g, "/");
}
module.exports.projectPath = projectPath;

// Lib Root
const libRoot = Path.dirname(Path.resolve(__dirname));
module.exports.libRoot = libRoot;

// Project Path
function libPath(path) {
  return Path.resolve(libRoot, path).replace(/\\/g, "/");
}
module.exports.libPath = libPath;

// IsProd
module.exports.isProd = ()=>process.env.NODE_ENV === 'production';

// Deep Clone
function deepClone(a) {
  return JSON.parse(JSON.stringify(a));
}
module.exports.deepClone = deepClone;

// ClearConsole
function clearConsole() {
  // Based on https://github.com/stevenvachon/cli-clear
  var i, lines;
  var stdout = "";
  if (windows === false)
    stdout += "\x1B[2J";
  else {
    lines = process.stdout.isTTY ? process.stdout.getWindowSize()[1] : 3;
    for (i = 0; i < lines; i++)
      stdout += "\r\n";
  }
  // Reset cursor
  stdout += "\x1B[0f";
  process.stdout.write(stdout);
}
module.exports.clearConsole = clearConsole;
