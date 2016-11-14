const Config = require('../config');
const Utils = require('../utils');

const ServerFactory = require('./factory');
const ServerPlugins = require('./plugins');

try {
  require(Utils.projectPath('app/_server.js'));
} catch (e) {

}

module.exports = ServerFactory({
  name: Config.get('project.name'),
  plugins: ServerPlugins({}),
});
