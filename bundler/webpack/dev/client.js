const Webpack = require('webpack');
const Bus = require('../../../bus');
const ClientConfig = require('../config/client');
const DevServerConfig = require('../config/dev-server');
const WebpackDevServer = require("webpack-dev-server");

Bus.name = 'Bundler';

const compiler = Webpack(ClientConfig());

const server = new WebpackDevServer(compiler, DevServerConfig);

server.listen(DevServerConfig.port);

Bus.message('Listening on port ' + DevServerConfig.port);
