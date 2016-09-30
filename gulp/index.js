// Disable OS Annoying Notifies
process.env.DISABLE_NOTIFIER = true;

// Server Tasks
require('./server');

// Client Tasks
require('./client');
