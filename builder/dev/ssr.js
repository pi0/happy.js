module.exports = function (cb) {

  var cb_exec = false;

  const Webpack = require('webpack');
  const MFS = require('memory-fs');
  const Path = require('path');
  const IPCServer = require('../ipc/server');
  const WebpackConfig = require('../config/webpack.config.ssr')();

  const outputPath = Path.join(WebpackConfig.output.path, WebpackConfig.output.filename);

  const serverCompiler = Webpack(WebpackConfig);
  const mfs = new MFS();
  serverCompiler.outputFileSystem = mfs;

  // Watch and update server renderer
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err;
    stats = stats.toJson();
    stats.errors.forEach(err => console.error(err));
    stats.warnings.forEach(err => console.warn(err));
    // Send bundle
    IPCServer.bundle('ssr', mfs.readFileSync(outputPath, 'utf-8'));

    if (!cb_exec) {
      cb();
      cb_exec = true;
    }

  });

};
