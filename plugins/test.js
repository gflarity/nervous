var system_type = 'stdout';
var config = {};

var axon_factory = require('../lib/axon_factory')( system_type, config );

var usage =  'Usage: node test.js <plugin_name>';

if ( process.argv[2] ) {
    
    //strip the nervous_plugin from in front if its there
    var subspace = process.argv[2].replace(/^nervous_plugin_/, '');
    
    try {
	    require( process.argv[2] )( axon_factory( subspace ) );
    } catch ( e ) {

        //we also support dropping the nervous_plugin_ for testing:        
        try { 
            require( 'nervous_plugin_' + process.argv[2]  )( axon_factory( subspace ) );
        }
        catch ( e ) {
            //finally, usage and exit code 1!
            console.log( usage );
            process.exit(1);
        }
        
    }
}
else {

    console.log( usage );
}


