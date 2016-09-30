// Disable OS Annoying Notifies
process.env.DISABLE_NOTIFIER = true;

// Initialize webpack configs
const Config = require('../config');
Config.initWebpack();

// Server Tasks
require('./server');

// Client Tasks
require('./client');
