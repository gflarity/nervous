var system_type = 'stdout';
var config = {};

var axon_factory = require('../lib/axon_factory')( system_type, config );

require( './' + process.argv[2] )( axon_factory(  process.argv[2] ) );
