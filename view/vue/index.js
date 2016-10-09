// Based on https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js
process.env.VUE_ENV = 'server'; // This will help rendering performance, by turning data observation off

const fs = require('fs');
const path = require('path');
const Serialize = require('serialize-javascript');
const Html = require('./html');
const Renderer = require('./renderer');

module.exports = function (options) {

  // Load Html
  var html = Html(options.template);

  // Initialize renderer
  var renderer = false;
  if (options.ssr) {
    Renderer(function (r) {
      console.log('[SSR] [Vue] Renderer Loaded');
      renderer = r;
    });
  }

  function handle(request, reply) {

    // Hapi -> Raw
    var req = request.raw.req;
    var res = request.raw.res;

    if (!options.ssr) {
      res.write(html.head);
      res.write('<div id="app"></div>');
      return res.end(html.tail);
    }

    if (!renderer) {
      console.error('[SSR] Vue is not available at the moment!');
      res.write(html.head);
      res.write('<div id="app"></div>');
      return res.end(html.tail);
    }

    // var s = Date.now();

    // Make rwquest context
    const context = {
      url: req.url,
      token: req.headers.authorization,
      initialState: {},
    };

    const renderStream = renderer.renderToStream(context);
    let firstChunk = true;

    res.write(html.head);

    renderStream.on('data', chunk => {
      if (firstChunk) {
        // embed initial store state
        if (context.initialState) {
          res.write(`<script>window.__INITIAL_STATE__=${Serialize(context.initialState, {isJSON: true})}</script>`)
        }
        firstChunk = false
      }
      res.write(chunk)
    });

    renderStream.on('end', () => {
      res.end(html.tail);
      // console.log(`whole request: ${Date.now() - s}ms`)
    });

    renderStream.on('error', err => {
      console.error('[SSR] Runtime Error! ' + err);
      console.error(err);
      res.write('<div id="app"></div>');
      return res.end(html.tail);
    });

  }

  return handle;
};

