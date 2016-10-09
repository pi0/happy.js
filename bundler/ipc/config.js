const OS=require('os');

module.exports = function(id){
    return {
        // used for Unix Socket (Unix Domain Socket) namespacing.
        // If not set specifically, the Unix Domain Socket will combine the socketRoot,
        // appspace, and id to form the Unix Socket Path for creation or binding.
        // This is available incase you have many apps running on your system,
        // you may have several sockets with the same id, but if you change the appspace,
        // you will still have app specic unique sockets.
        // TODO: Namespace to project
        appspace: 'bundler.',

        // the directory in which to create or bind to a Unix Socket
        socketRoot: '/tmp/',

        // the id of this socket or service
        id: id,

        // the local or remote host on which TCP, TLS or UDP Sockets should connect
        //should resolve to 127.0.0.1 or ::1
        // networkHost: 'localhost',

        // the default port on which TCP, TLS, or UDP sockets should connect
        networkPort: 0,

        // the default encoding for data sent on sockets.
        // Mostly used if rawBuffer is set to true.
        // Valid values are : ascii utf8 utf16le ucs2 base64 hex .
        // encoding: 'utf8',

        // if true, data will be sent and received as a raw node Buffer NOT an Object as JSON.
        // This is great for Binary or hex IPC, and communicating with other processes in languages like C and C+
        // rawBuffer: false,

        // synchronous requests. Clients will not send new requests until the server answers.
        // sync: false,

        // turn on/off logging default is false which means logging is on
        silent: !false,

        // turn on/off util.inspect colors for ipc.log
        logInColor: true,

        // set the depth for util.inspect during ipc.log
        // logDepth: 5,

        // this is the max number of connections allowed to a socket.
        // It is currently only being set on Unix Sockets.
        // Other Socket types are using the system defaults.
        // maxConnections: 100,

        // 	this is the time in milliseconds a client will wait before trying
        // to reconnect to a server if the connection is lost.
        // This does not effect UDP sockets since they do not have a client server
        // relationship like Unix Sockets and TCP Sockets.
        // retry: 500,

        // if set, it represents the maximum number of retries after each disconnect
        // before giving up and completely killing a specific connection
        // maxRetries: false,

        // Defaults to false meaning clients will continue to retry to connect to servers indefinitely at the retry interval.
        // If set to any number the client will stop retrying when that number is exceeded after each disconnect.
        // If set to true in real time it will immediately stop trying to connect regardless of maxRetries.
        // If set to 0, the client will NOT try to reconnect.
        // stopRetrying: false
    };
};
