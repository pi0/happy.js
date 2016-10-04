const webpack = require('webpack');
const MFS = require('memory-fs');
const Path = require('path');
const Config = require('../../../../config');

module.exports = function (server, onUpdate) {

  const clientAppConfig = Config.get('build.app');

  // Watch and update server renderer
  const serverCompiler = webpack(clientAppConfig);
  const mfs = new MFS();
  const outputPath = Path.join(clientAppConfig.output.path, clientAppConfig.output.filename);
  serverCompiler.outputFileSystem = mfs;
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    onUpdate(mfs.readFileSync(outputPath, 'utf-8'))
  });

};
