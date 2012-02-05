var GraphiteAxon = require('./graphite_axon').GraphiteAxon;
var STDOUTAxon = require('./stdout_axon').STDOUTAxon;

module.exports = function( system_type, config ) {

	switch(system_type) {

	  case 'graphite' : 
	    return function( subspace ) {
		var namespace = config.graphite_namespace + '.' + subspace; 
	        return new GraphiteAxon( namespace, config.graphite_host, config.graphite_port );
	    }

   	  case 'stdout' : 
	    return function( subspace ) {
		var namespace = subspace
		return new STDOUTAxon( namespace );

	    }


	}

};
