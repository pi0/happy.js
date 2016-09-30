// https://github.com/lorenwest/node-config/wiki/Sub-Module-Configuration

// Applications don't get No config files warnings if they aren't using node-config.
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

// https://github.com/lorenwest/node-config/issues/329
process.env.ALLOW_CONFIG_MUTATIONS = 'y';

const Config = require('config');
const AppConfig = require('./default/app');
const ClientConfig = require('./default/client');
const WebpackConfig = require('./default/webpack');
const Utils = require('../utils');

// Get
function get(key) {
  return Config.get('happier.' + key)
}
module.exports.get = get;

// Has
function has(key) {
  return Config.has('happier.' + key)
}
module.exports.has = has;

// Extend
function extend(configs, force_keep) {
  Config.util.extendDeep(Config.happier, configs);
  if (force_keep != null)
    Config.util.extendDeep(Config.happier, force_keep);
}
module.exports.exntend = extend;

// Initialize
// but keep already loaded configs
var loadedConfigs = Config.has('happier') ? Utils.deepClone(Config.get('happier')) : {};
Config.util.setModuleDefaults('happier', loadedConfigs);

extend({'app': AppConfig()}, loadedConfigs);
extend({'client': ClientConfig()}, loadedConfigs);
extend({'webpack': WebpackConfig()}, loadedConfigs);
