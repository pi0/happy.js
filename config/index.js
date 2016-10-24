const Utils = require('../utils');
const Extendify = require('extendify');

// https://github.com/lorenwest/node-config/wiki/Sub-Module-Configuration

// Applications don't get No config files warnings if they aren't using node-config.
process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

// https://github.com/lorenwest/node-config/issues/329
process.env.ALLOW_CONFIG_MUTATIONS = 'y';

delete process.env.NODE_CONFIG_STRICT_MODE;


const _Config = require('config');

// Get
module.exports.get = function get(key) {
  return _Config.get('happy.' + key)
};

// getClone
module.exports.getClone = function getClone(key) {
  return Utils.deepClone(module.exports.get(key));
};

// Has
module.exports.has = function has(key) {
  return _Config.has('happy.' + key)
};


const defaultConfig = require('./default')();


// Load missing user configs
extendify = Extendify({inPlace:false});
let config=extendify(defaultConfig, _Config);

_Config.util.setModuleDefaults('happy', config);
