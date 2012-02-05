var net = require('net');

var GraphiteAxon = function ( namespace, host, port) {
    
    var this_axon = this;

    this_axon.namespace = namespace;
    this_axon.host = host;
    this_axon.port = port;

    this_axon.tcp_connection = net.createConnection( port, host );

    //TODO eventually this could get big if we can't send them out for a while
    this_axon.message_buffer = [];

    //not this is async, so everything below will get set first
    this_axon.tcp_connection.connect( port, host );

    //on connect we need to check if we have any messages in the
    //the message buffer, send them if so but first send a new
    //connect message
    var on_connect = function() {

	var connected_message_metric_path = axon.namespace + '.nervous.connected';
	var connected_mesage_value = '1';
	var connected_message_timestamp = Math.floor( new Date / 1000.0 );
	this_axon.tcp_connection.write( connected_message_metric_path 
				   + ' ' + connected_message_value 
				   + ' ' + connected_message_timestamp + '\n' );

	
	//TODO eventually this could get big if we can't send them out for a while
	while( this.message_buffer.length > 0) {

	    var message = this_axon.message_buffer.shift();
	    this_axon.write( message );
	}
	
    };
    this_axon.tcp_connection.on( 'connect', on_connect );

    var on_error = function( exception ){
	
	//TODO create an error message and enque it
	//log error
	
    };
    this_axon.tcp_connection.on( 'error', on_error );

    var on_end = function( ) {
	
	//TODO create an end message
	//log that we ended

	//reconnect
	this_axon.tcp_connection.connect( this_axon.port, this_axon.port );

    };
    this_axon.tcp_connection.on( 'end', on_end );

};
module.exports.GraphiteAxon = GraphiteAxon;

GraphiteAxon.prototype.fire = function( name, value, timestamp ) {

    this_axon = this;

    //by default we generate the timestamp on fire, but it can be
    //overridden
    timestamp = timestamp || Math.floor(new Date()/1000);

    var metric_path = this_axon.namespace + '.' + name;
    var metric_value = value;
    var metric_timestamp = timestamp;
    var line = metric_path + ' ' + metric_value + ' ' + metric_timestamp + '\n';

    try { 
	this_axon.tcp_connection.write( line );
    } catch ( e ) {

	console.log( line );

	//TODO need to resend these
	this.message_buffer.push ( line );
    }
    
    

};

GraphiteAxon.prototype.misfire = function( error ) {

    this_axon = this;

    console.log( error );

    var name = 'nervous.misfire';
    this_axon.fire( name, 1 );
    
};
