var
  sys = require('sys'),
  path = require('path'),
  http = require('http'),
  streamLogger = require('./lib/streamlogger'),
  logger = new streamLogger.StreamLogger('log1.log','log2.log');
   
logger.level = logger.levels.info; //Defaults to info  
logger.emitter
  .addListener('open', function() {
    sys.puts("All streams are open");
  })
  .addListener('error', function(err,logPath) {
    sys.puts("Error: " + err + " while writing to " + logPath);
  })
  .addListener('message', function(message,levelName) {
    sys.puts("Received message: " + message + " with level " + levelName);
  })
  .addListener('loggedMessage', function(message,levelName) {
    //Only gets called for levels allowed by StreamLogger#level
    sys.puts("Logged message: " + message + " with level " + levelName);
  })
  .addListener('close', function() {
    sys.puts("All loggers closed");
  })
  //Alternate style
  .addListener('message-info', function(message) {
    sys.puts("OnlyInfo");
  })
  .addListener('loggedMessage-info', function(message) {
    sys.puts("Logged OnlyInfo");
  });
  
//If you want to rotate logs, this will re-open the files on sighup
process.addListener("SIGHUP", function() {
  logger.reopen();  
});

http.createServer(function(req, res) {
  logger.debug("DebugMsg"); //Won't get printed since log level was set to debug
  logger.info("InfoMsg");
  logger.warn("WarnMsg", function () {sys.puts("MSG flushed to kernel")});
  logger.fatal("FatalMsg");
   
  res.writeHead(200);
  res.write("Hello!");
  res.end();

  //Setting a custom format, note that since this is an async lib
  //setting the format here WILL affect messages outputted prior during this
  //tick, and possibly the next
  logger.format = function(message,levelName) {
    if (levelName == 'warn')
      return "Custom message: " + message;
    else
      return false; //Use the default format
  }
  logger.warn("Should be custom");
  logger.info("Should be standard");

  //Setting custom log levels, note that since this is async lib this can
  //can cause problems with calls sent earlier in this tick, if you delete
  // an existing log level
  var levels = logger.levels;
  levels.extraFatal = levels.fatal + 1;
  //This will not work, as emitter is an existing property of the logger
  //Trying to set this will cause logger to emit an 'error'
  levels.emitter = 20; 
  logger.levels = levels;
  logger.extraFatal("I've been shot through the heart!");
}).listen(8000);
