const Webpack = require('webpack');
const MFS = require('memory-fs');
const Bus = require('../../bus');
const ClientConfig = require('./config/client');
const SSRConfig = require('./config/ssr');
const DevServerConfig = require('./config/dev-server');
const WebpackDevServer = require("webpack-dev-server");

Bus.name='Webpack';

const compiler = Webpack([ClientConfig, SSRConfig]);
var mfs = compiler.outputFileSystem = new MFS();

var devServer = new WebpackDevServer(compiler, DevServerConfig);

devServer.listen(DevServerConfig.port, undefined, function (err) {
  if (err) console.error(err);
  Bus.log('Listening', 'Webpack')
});

compiler.watch({}, (err, stats) => {
  if (err)
    Bus.log(err, 'Webpack');

  stats.stats.forEach(function (stat) {
    //var name = stat.options.name;
    var name='foo';
    var files = Object.keys(stat.compilation.assets);
    Bus.log(files, name);
  });

  //Bus.bundle('ssr', mfs.readFileSync(outputPath, 'utf-8'));
});
