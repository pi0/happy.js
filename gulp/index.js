// Disable OS Annoying Notifies
process.env.DISABLE_NOTIFIER = true;

// Server Tasks
require('./app');

// Client Tasks
require('./client');
