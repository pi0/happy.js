const Path = require('path');

// Method inspired by https://github.com/inxilpro/node-app-root-path#how-it-works-under-the-hood
const projectRoot = Path.dirname(Path.resolve(__dirname).split('happier')[0]);
module.exports.projectRoot=projectRoot;

// Project Path
function projectPath(path) {
  return Path.resolve(projectRoot,path);
}
module.exports.projectPath=projectPath;

// IsProd
const isProd = process.env.NODE_ENV === 'production';
module.exports.isProd=isProd;

// Deep Clone
function deepClone(a) {
  return JSON.parse(JSON.stringify(a));
}
module.exports.deepClone=deepClone;
