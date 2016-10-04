const Client=require('./client');
const App=require('./app');
const DevServer=require('./dev-server');

module.exports = function(){

  return {
    client: Client(),
    app: App(),
    dev_server: DevServer(),
  }

};
