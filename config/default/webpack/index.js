const Client=require('./client');
const Server=require('./server');
const DevServer=require('./dev-server');

module.exports = function(){

  return {
    //client: Client(),
    server: Server(),
    //dev_server: DevServer(),
  }

};
