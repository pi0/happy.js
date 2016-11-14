import ClientFactory from './factory';
import ClientPlugins from './plugins';

import Client from 'app/_client.js';

module.exports = ClientFactory({
  plugins: [
    {
      register: ClientPlugins,
    }
  ],
});
