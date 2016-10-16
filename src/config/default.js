const Path = require('path');
const Utils = require('../utils');

module.exports = function () {
  return {

    root: Utils.projectPath('.'),

    entry_client: Utils.projectPath('src/client/index.js'),
    entry_app: Utils.projectPath('src/app/index.js'),

    public: Utils.projectPath('src/client/public'),
    assets: Utils.projectPath('src/client/public/assets'),

    // Client Dists
    dist: {
      path: Utils.projectPath('dist'),
      distPath: '/dist/',
      filename: 'client.js',
      filename_ssr: 'client.ssr.js',
      publicPath: '/public',
      vendor_filename: 'client.vendor.js',
    },

    dist_app: {
      path: Utils.projectPath('dist'),
      filename: 'server.js',
    },

    routes: Utils.projectPath('src/app/routes'),

    view: {
      vue: {
        ssr: true,
        template: Utils.projectPath('src/client/public/index.html'),
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
      port: 3001
    },


    // Webpack aliases config
    aliases: {
    },

    vendor: [
      'vue',
      'vuex-router-sync',
      'vuex',
      Utils.libPath('client/plugins/vue-resource.common.js'),
      'vue-router',
      'bootstrap-vue'
    ],

    // Attempt to use the URL "http://my-private-site.localtunnel.me"
    // Set to null to disable this
    tunnel: null,

  };

};
