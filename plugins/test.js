var system_type = 'stdout';
var config = {};

var axon_factory = require('../lib/axon_factory')( system_type, config );

var usage =  'Usage: node test.js <plugin_name>';

if ( process.argv[2] ) {
    
    try {
	require(  process.argv[2] )( axon_factory(  process.argv[2] ) );
    } catch ( e ) {

	console.log( usage );
    }
}
else {

    console.log( usage );
}


