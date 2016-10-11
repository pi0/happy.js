const SUBSCRIBE_EVENT = '__SUBSCRIBE__';

class Bus {

  // Bus class
  constructor(identifier) {
    var self = this;

    self.clients = {};
    self.subscribers = [];
    self.MESSAGE_IDENTIFIER = identifier ? identifier : 'IPC_BUS';
    self.name = 'DEFAULT';
    self.debug = !false;
    self.onError = (e)=>self._debug(red(e));


    return self;
  }

  // Emit
  emit(event, payload, to) {
    var self = this;
    self._debug('Emit ' + magenta(event) + (to ? ' (to: ' + red(to) + ')' : ''));

    // Prepare event message
    var message = {
      id: self.MESSAGE_IDENTIFIER,
      event: event,
      payload: payload,
    };

    send(process);
    // self.clients.forEach(send);

    // Error handled message sender
    function send(client) {
      if (to === client) // Avoid loops
        return;
      try {
        client.send(message);
      } catch (e) {
        //self.onError(e); // client simply does not supports sending :)
      }
    }
  }

  // Log
  log(message, prefix) {
    var self = this;

    self.emit('log', {message: message, prefix: prefix});
  }

  // Debug
  _debug(message) {
    var self = this;

    var tag = '[BUS] [' + green(('        ' + self.name.toUpperCase()).slice(-7)) + ']';
    self.debug && console.log(tag + ' ' + message);
  }

  // Subscribe
  subscribe(event, subscriber) {
    var self = this;
    self._debug('Subscribe ' + magenta(event) + ' => ' + grey(subscriber));

    // Add to local subscribers
    if (!self.subscribers[event]) self.subscribers[event] = [];
    self.subscribers[event].push(subscriber);

    // Emit subscribe request
    self.emit(SUBSCRIBE_EVENT, {
      name: self.name,
      event,
    })
  }

  // `on` event
  on(message, client, name) {
    var self = this;

    // Check if message belongs to this Bus
    if (message.id !== self.MESSAGE_IDENTIFIER)
      return;

    self._debug('Received ' + magenta(message.event) + ' (source: ' + yellow(name) + ')');

    // Check for special SUBSCRIBE messages
    if (message.event === SUBSCRIBE_EVENT) {
      self._debug('Subscribe request ' + message.payload);
      self.subscribe(message.payload.event, m=> {
        //self._debug('Pass event to' + message.payload.name);
        self.emit(message.payload.event, m, message.payload.name)
      });
      return;
    }

    // Send message to all subscribers
    if (self.subscribers[message.event])
      self.subscribers[message.event].forEach(handle);

    // Send event to subscriber
    function handle(subscriber) {
      try {
        if (subscriber instanceof Function)
          subscriber(message.payload);
        else if (subscriber.on instanceof Function)
          subscriber.on(message.payload);
      } catch (e) {
        self.onError(e);
      }
    }

  }

  // Listen for events
  listen(client, name) {
    var self = this;

    // Store client
    self.clients[name] = client;

    // Try to setup `message` hook on that client
    if (client.on instanceof Function) {
      try {
        client.on('message', message=> {
          self.on(message, client, name);
        });
      } catch (e) {
        self.onError(e);
      }
    }

  }
}

// Node String Colors Support (https://git.io/colors)
// Usage console.log(green("Hello world!")
const _c = require('util').inspect.colors;
Object.keys(_c).forEach(c =>global[c] = s =>`\x1b[${_c[c][0]}m${s}\x1b[${_c[c][1]}m`);

module.exports = new Bus();
