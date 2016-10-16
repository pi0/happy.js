// https://github.com/lorenwest/node-config/wiki/Sub-Module-Configuration

// Applications don't get No config files warnings if they aren't using node-config.
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

// https://github.com/lorenwest/node-config/issues/329
process.env.ALLOW_CONFIG_MUTATIONS = 'y';

const _Config = require('config');

// Get
module.exports.get = function get(key) {
  return _Config.get('happier.' + key)
};

// Has
module.exports.has = function has(key) {
  return _Config.has('happier.' + key)
};


const settings = require('./default')();

// Load missing user configs
var userConfigs = _Config.has('happier') ? _Config.get('happier') : {};
_Config.util.extendDeep(settings, userConfigs);

_Config.util.setModuleDefaults('happier', settings);
