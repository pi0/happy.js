var Child = require('child_process');
var Path = require('path');

module.exports.init = function () {
  banner();
  Child.fork(Path.resolve(__dirname,'./client.js'));
  Child.fork(Path.resolve(__dirname,'./ssr.js'));
  Child.fork(Path.resolve(__dirname,'./app.js'));
};


function banner() {
  console.log(`
--------------------------------------------------
 _   _                            _     
| | | | __ _ _ __  _ __  _   _   (_)___ 
| |_| |/ _\` | \'_ \\| \'_ \\| | | |  | / __|
|  _  | (_| | |_) | |_) | |_| |_ | \\__ \\
|_| |_|\\__,_| .__/| .__/ \\__, (_)/ |___/
            |_|   |_|    |___/ |__/
--------------------------------------------------
  `)
}



