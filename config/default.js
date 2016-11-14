const Path = require('path');
const Utils = require('../utils');

module.exports = function () {
  return {

    root: Utils.projectPath('.'),

    entry_client: Utils.libPath('client/index.js'),
    entry_server: Utils.libPath('server/index.js'),

    public: Utils.projectPath('client/public'),
    assets: Utils.projectPath('client/public/assets'),

    // Client Dists
    dist: {
      path: Utils.projectPath('dist'),
      distPath: '/dist/',
      filename: 'client.js',
      filename_ssr: 'client.ssr.js',
      publicPath: 'public/',
      vendor_filename: 'client.vendor.js',
    },

    dist_server: {
      path: Utils.projectPath('dist'),
      filename: 'server.js',
    },

    view: {
      vue: {
        ssr: true,
        template: Utils.libPath('client/public/index.html'),
      }
    },

    database: {
      mongodb: {
        uri: null,
        options: {},
      }
    },

    jwt: {
      secret: 'SOOOSECURE',
      verify: {
        algorithms: ['HS256']
      },
      ignoreExpiration: true,
    },

    babel: {
      "presets": [
        ["es2015"]
      ]
    },

    // Hapi Listening config
    connection: {
      port: 3000,
    },

    hapi: {
      debug: {
        log: ['error', 'info'],
        // request: ['error']
      }
    },

    aliases: {},

    vendor: [
      'vue',
      'vuex-router-sync',
      'vuex',
      'vue-router',
      'vue/dist/vue.common.js',
      Utils.libPath('client/plugins/resource/vue-resource.common.js'),
    ],

    // Attempt to use the URL "http://my-private-site.localtunnel.me"
    // Set to null to disable this
    tunnel: null,

  };

};
