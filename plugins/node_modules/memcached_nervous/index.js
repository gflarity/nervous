//config
var host = 'localhost';
var port = 11211;
var interval = 1000;

var stats_to_gather = 
    [
     'get_misses', //number of get misses
     'curr_connections', //current connections
     'evictions', //number of evictions
     'rusage_user', //seconds the cpu has devoted to the process as the user
     'rusage_system', //econds the cpu has devoted to the process as the system
     'decr_misses', //decr misses
     'accepting_conns', //accepting connections true/false,
     'pid', //the pid
     'cmd_set', //the number of times cmd set called
     'cmd_flush', //the number of times flush called
     'delete_misses', //delete misses '0',
     'cas_hits', //compare and swap hits
     'incr_misses', //increment misses,
     'cas_badval', //cass bad values
     //'conn_yields', //the number of connection yields
     'get_hits', //number of get hits
     'incr_hits', //number of incr hits
     'delete_hits', //number of delete hits
     'bytes_read', //bites read count
     'bytes_written', //butes written count
     'cas_misses', //cas misses
     'total_connections', //cas misses
     'bytes', //total number of bytes currently in use by curr_items
     'total_items', //total number of items
     'threads', //number of threads in use
     'decr_hits', //number of decr hits
     'cmd_get', //total GET commands issued to the server
     'curr_items', //total number of items currently in memcache
     //'time', //current time
     //'version', //the version of memcache
     //'uptime', //the update for the process
     ];

//deps
var memcache = require('memcache');
var utils = require('util');

//code
module.exports = function( axon ) {

    //this gets called every interval milliseconds
    var check_stats = function() {
	
	var client = new memcache.Client(port, host);
	client.connect();
	var on_connect = function () {
	    client.stats( function( err, result ){

		    if( err )  { axon.emit( 'error',  err ) };
		    
            //console.log( utils.inspect( result, true, null, true ) );
            for (var i = 0; i < stats_to_gather.length; i++) {
                var name = stats_to_gather[i];
                var value = result[name];
                var timestamp = result.time;
                
                
                axon.emit('data', name, value, timestamp);
            }
            //TODO reset and then close the client, the client doesn't support
            //reset, need to patch it first            
            /*client.stats('reset', function(err) {
                console.log(err);
                client.close();
            });*/
        });

	};
	client.on( 'connect', on_connect );
	
	var on_error = function( error ) {
		
		axon.emit( 'error', error);
	};
	client.on( 'error', on_error ); 
	

    };

    //periodically send back stats
    setInterval( check_stats, interval );

};  


