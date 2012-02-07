var
  sys = require('sys'),
  http = require('http'),
  streamLogger = require('./lib/streamlogger'),
  logger = new streamLogger.StreamLogger('log1.log');
  //Defaults to info, debug messages will not be logged at info
  logger.level = logger.levels.debug;
  
http.createServer(function(req, res) {
  //Other default levels are .debug .warn and .fatal
  logger.info("My Info message"); 
   
  res.writeHead(200);
  res.write("Hello!");
  res.end();
}).listen(8000);

//If you want to rotate logs, this will re-open the files on sighup
process.addListener("SIGHUP", function() {
  logger.reopen();  
});
