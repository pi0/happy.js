// ==========================================================
// A PART OF HAPPY.JS
// ALL RIGHTS TO POOYA PARSA <POOYA@PI0.IR>
// SEE LICENSE FILE
// ==========================================================

const SUBSCRIBE_EVENT = '__SUBSCRIBE__';

class Bus {

  // Bus class
  constructor(identifier) {
    this.peers = [];
    this.subscribers = []; // [id,event,callback},...]
    this.subscribers_id_counter = 0;
    this.peer_ids_counter = 0;
    this.MESSAGE_IDENTIFIER = identifier ? identifier : 'IPC_BUS';
    this.name = '~';
    this.debug = false;
    this.onError = (e)=>this.debug && this._debug(red(e));
    process.__name = this.name;
    this.connect(process); // Listen for parent messages

    // KEEP ME ALIVE!
    this.keep_alive = setInterval(()=> {
    }, Number.POSITIVE_INFINITY);
  }

  kill() {
    clearInterval(this.keep_alive);
  }

  // Emit
  emit(event, message, peer, is_private) {
    this.debug && this._debug('Emitted ' + magenta(event) + (peer ? ' to ' + yellow(peer.__name) : ''));

    var _message = {
      id: this.MESSAGE_IDENTIFIER,
      event,
      message
    };

    if (peer) {
      // Send DOWN to peer
      this._send_ipc(peer, _message);
      return
    }

    // Send to all local subscribers
    if (is_private !== false) {
      this.subscribers.forEach((subscriber)=> {
        if (subscriber.event != '*' && subscriber.event !== event) return;
        // this.debug && this._debug(grey(JSON.stringify(message)) + ' to ' + blue(subscriber.id));
        subscriber.callback(message, event, peer);
      });
    }

    // Send UP to process PARENTS and not itself
    if (is_private !== true) {
      this._send_ipc(process, _message);
    }
  }

  _send_ipc(peer, _message) {
    if (peer != process && !peer.connected) {
      this.disconnect(peer);
      return;
    }
    if (peer.send instanceof Function) {
      try {
        peer.send(_message);
      } catch (e) {
        this.debug && this._debug('Unable to send to ' + peer.__name + ' : ' + e);
      }
    }
  }

  // Subscribe
  subscribe(event, to, _id) {
    // Create new subscriber object
    var callback = to.on instanceof Function ? to.on : to;
    var id = event + '@' + (_id ? _id : '~' + (++this.subscribers_id_counter));
    var s = {event, callback, id};
    this.subscribers.push(s);

    // Debug
    this.debug && this._debug('Subscribe ' + blue(s.id));

    // Emit subscribe request
    this.emit(SUBSCRIBE_EVENT, {event});

    return s;
  }

  unsubscribe(sid) {
    this.subscribers = this.subscribers.filter(s=>s.id !== sid);
  }

  subscribe_peer(event, peer) {
    this.debug && this._debug('Subscribe peer ' + yellow(peer.__name) + ' to ' + magenta(event));
    var fn = message=> this.emit(event, message, peer);
    var s = this.subscribe(event, fn, 'to_' + peer.__name);
    peer.__subscribtions.push(s);
  }

  // `on` event
  on(_message, peer) {
    // Check if message belongs to this Bus
    if (_message.id !== this.MESSAGE_IDENTIFIER)
      return;

    // Extract actual message
    var {event, message} = _message;

    // Check for special SUBSCRIBE messages
    if (event === SUBSCRIBE_EVENT) {
      this.subscribe_peer(message.event, peer);
      return;
    }

    this.debug && this._debug('Received ' + magenta(event) + ' from ' + yellow(peer.__name) + ' ' + grey(JSON.stringify(message)));
    this.emit(event, message, undefined, true);
  }


  // Connect to peer and for events from ipc peer
  connect(peer, name) {
    //
    peer.__name = name ? name : ('peer' + (++this.peer_ids_counter));
    peer.__subscribtions = [];

    //
    this.peers.push(peer);

    // Try to setup `message` hook on that peer
    if (peer.on instanceof Function) {
      try {
        peer.on('message', message=> {
          // Handle peer's message
          this.on(message, peer);
        });

        peer.on('disconnect', ()=> {
          // Auto disconnect peer
          this.debug && this._debug(yellow(peer.__name) + ' disconnected!');
          this.disconnect(peer);
        });

        peer.on('error', err=> {
          // Auto disconnect peer
          this.debug && this._debug(yellow(peer.__name) + ' : ' + red(err));
          this.disconnect(peer);
        });

      } catch (e) {
        this.onError(e);
      }
    }
  }

  disconnect(peer) {
    this.debug && this._debug(red('Disconnecting ') + yellow(peer.__name));
    if (peer.__subscribtions instanceof Array)
      peer.__subscribtions.forEach(s=>this.unsubscribe(s.id));
  }

  // Simple messaging emitter
  message(message, tag) {
    if (!tag)
      tag = this.name;
    this.emit('message', {message, tag});
  }

  // Debug
  _debug(msg) {
    if (!this.debug)
      return;
    if (typeof msg !== 'string')
      msg = JSON.stringify(msg);
    // if (msg.includes('__')) return; // Internal messages
    var tag = '[BUS] [' + green(('        ' + this.name.toUpperCase()).slice(-7)) + ']';
    console.log(tag + ' ' + msg);
  }


}

// Node String Colors Support (https://git.io/colors)
// Usage console.log(green("Hello world!")
const _c = require('util').inspect.colors;
Object.keys(_c).forEach(c =>global[c] = s =>`\x1b[${_c[c][0]}m${s}\x1b[${_c[c][1]}m`);

module.exports = new Bus();
