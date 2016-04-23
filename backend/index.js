var readline = require('readline');
var server = require('./app/server');

// If running on windows, emit SIGINT on ^C from stdin, watch
// http://stackoverflow.com/a/14861513/3376793 for more info
if (process.platform === 'win32') {
  var lineReader = readline.createInterface({
    input  : process.stdin,
    output : process.stdout
  });
  lineReader.on('SIGINT', function() { process.emit('SIGINT'); });
}

// Gracefully close server on Ctrl-c
process.on('SIGINT', function() {
  server.close(function() {
    console.log('Server closed');
    process.exit();
  });
});

// Start server
server.start(function(){ console.log('Let the magic begin!'); });
