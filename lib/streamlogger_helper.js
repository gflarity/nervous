//deps
var streamlogger = require( 'streamlogger' );

var loggers = {};

module.exports.createStreamLogger = function ( id, log_path ) {
    
    var logger;
    if ( loggers[id] ) {
        
            logger =  loggers[id];
    }
    else {
                
        logger = new streamlogger.StreamLogger( log_path );
        
        //this is a bit obfuscated, but I really think fatal should be called error
        logger.error = logger.fatal;

        loggers[id] = logger;
    }
    
    return logger;
};


module.exports.getStreamLogger = function ( id ) {
    
    return loggers[id];      
};