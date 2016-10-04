// Based on https://github.com/vuejs/vue-hackernews-2.0/blob/master/server.js
process.env.VUE_ENV = 'server'; // This will help rendering performance, by turning data observation off

const fs = require('fs');
const path = require('path');
const Utils = require('../../../utils');
const Serialize = require('serialize-javascript');
const Html = require('./html');
const Renderer = require('./renderer');

module.exports = function (path) {

  // Load Html
  var html = Html(Utils.projectPath(path));

  // Initialize renderer
  var renderer = false;
  Renderer(function (r) {
    console.log('Vue Renderer Loaded');
    renderer = r;
  });

  function handle(request, reply) {

    // Hapi -> Raw
    var req = request.raw.req;
    var res = request.raw.res;

    if (!renderer) {
      console.error('[WARNING] Vue SSR is not available at the moment!');
      res.write(html.head);
      res.write('<div id="app"></div>');
      return res.end(html.tail);
    }

    // var s = Date.now();
    const context = {url: req.url};
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
      console.error(err.stack);
    });

  }

  return handle;
};

