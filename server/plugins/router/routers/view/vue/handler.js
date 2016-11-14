const fs = require('fs');
const path = require('path');
const Serialize = require('serialize-javascript');

const Utils = require('../../../../../../utils');
const Bus = require('../../../../../../bus');
const Config = require('../../../../../../config');

const Html = require('./html');
const Renderer = require('./renderer');

class VueHandler {

  constructor(options) {
    this.options = options;

    // Load Html Template
    this._init_template();

    // Initialize renderer
    this._init_renderer();

    // Set handler defaults
    this.handle = this.handle.bind(this);
    this.handle.defaults = {
      payload: {
        output: 'stream',
        parse: false
      }
    };

  }

  _init_template() {
    this.html = Html(this.options.template);
  }

  _init_renderer() {
    this.renderer = false;
    if (this.options.ssr) {
      Renderer(r=> {
        Bus.message('Vue Handler Ready');
        this.renderer = r;
      });
    }
  }

  handle(request, reply) {

    // Hapi -> Raw
    var req = request.raw.req;
    var res = request.raw.res;

    var head_rendered = false;
    var app_rendered = false;
    var tail_rendered = false;

    let graceful_end = (message, err)=> {
      if (message) {
        console.log('[SSR] ' + message);
        console.log(err);
      }
      if (!head_rendered)
        res.write(this.html.head);
      if (!app_rendered)
        res.write('');
      if (!tail_rendered)
        return res.end(this.html.tail);
    };

    if (!this.options.ssr)
      return graceful_end('Disabled by config');

    if (!this.renderer)
      return graceful_end('Still compiling...');

    // Make request context
    const context = {
      url: req.url,
      base_url: Config.get('base_url'),
      redirect: false,
      cookies: request.state,
      initialState: {},
    };

    const renderStream = this.renderer.renderToStream(context);
    let firstChunk = true;

    renderStream.on('data', chunk => {
      if (firstChunk) {
        // Check for redirects
        if (context.redirect) {
          renderStream.end();
          console.log('Redirect to: ' + context.url);
          return reply.redirect(context.url);
        }

        res.write(this.html.head);

        // embed initial store state
        if (context.initialState)
          res.write(`<script>window.___=${Serialize(context.initialState, {isJSON: true})}</script>`);

        firstChunk = false
      }
      res.write(chunk)
    });

    renderStream.on('end', () => {
      if (!context.redirect) {
        res.end(this.html.tail);
      }
    });

    renderStream.on('error', err => {
      console.log('Runtime Error!');
      return graceful_end(err, err);
    });

  }

}

module.exports = VueHandler;

