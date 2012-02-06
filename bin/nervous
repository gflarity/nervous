//config
var plugin_dir = './plugins';

var system_type = 'graphite';
var config = {
    graphite_host : 'stats01-smc03',
    graphite_port : '2003',
    graphite_namespace : 'nervous.www02-smc03'
};

//deps
var fs = require('fs');
var axon_factory = require('./lib/axon_factory')( system_type, config );

//code

var load_plugins = function () {
    fs.readdir( plugin_dir, function( err, entries ) {
	    var dirs = [];
	    entries.forEach( function( entry ) {
		    
		    var plugin_path = plugin_dir + '/' + entry;
		    fs.stat( plugin_path, function( err, stats ) {
			    if ( stats.isDirectory() ) {
				require( plugin_path )( axon_factory( entry ) );
			    }
			} );	
	    } );
	    

	}

	);
};

    
load_plugins();
