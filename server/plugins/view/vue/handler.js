// Based on https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js
process.env.VUE_ENV = 'server'; // This will help rendering performance, by turning data observation off

const fs = require('fs');
const path = require('path');
const Serialize = require('serialize-javascript');
const Html = require('./html');
const Renderer = require('./renderer');
const Utils = require('../../../../utils');

module.exports = function (options) {

  // Load Html
  var html = Html(options.template);

  // Initialize renderer
  var renderer = false;
  if (options.ssr) {
    Renderer(function (r) {
      console.log('[SSR] Vue Renderer Loaded');
      renderer = r;
    });
  }

  function handle(request, reply) {

    // Hapi -> Raw
    var req = request.raw.req;
    var res = request.raw.res;

    var head_rendered = false;
    var app_rendered = false;
    var tail_rendered = false;

    function graceful_end(message) {
      if (message)
        console.error('[SSR] ' + message);
      if (!head_rendered)
        res.write(html.head);
      if (!app_rendered)
        res.write('<div id="app"></div>');
      if (!tail_rendered)
        return res.end(html.tail);
    }

    if (!options.ssr)
      return graceful_end('Disabled by config');

    if (!renderer)
      return graceful_end('Still compiling...');

    // Make request context
    const context = {
      url: req.url,
      token: req.headers.authorization,
      initialState: {},
    };

    const renderStream = renderer.renderToStream(context);
    let firstChunk = true;

    renderStream.on('data', chunk => {
      if (firstChunk) {

        // Check for redirects
        if (context.redirect) {
          renderStream.end();
          return reply.redirect(context.url);
        }

        res.write(html.head);

        // embed initial store state
        if (context.initialState)
          res.write(`<script>window.___=${Serialize(context.initialState, {isJSON: true})}</script>`);

        firstChunk = false
      }
      res.write(chunk)
    });

    renderStream.on('end', () => {
      if (!context.redirect) {
        res.end(html.tail);
      }
    });

    renderStream.on('error', err => {
      console.log('Runtime Error!');
      return graceful_end(err.stack);
    });

  }

  return handle;
};

