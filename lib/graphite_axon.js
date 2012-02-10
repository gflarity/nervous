var net = require('net');
var events = require("events");
var util = require('util');

var streamlogger_helper = require('./streamlogger_helper');

//get the main logger
var log = streamlogger_helper.getStreamLogger( 'main' );

//TODO eventually this Axon should share a connection to graphite

var GraphiteAxon = function ( namespace, host, port) {
    
    var this_axon = this;
    
    //call super constructor
    events.EventEmitter.call(this_axon);
    
    //setup event listeners
    this_axon.on( 'data', this_axon.fire.bind( this_axon ) );
    this_axon.on( 'error', this_axon.misfire.bind( this_axon ) );
        
    this_axon.namespace = namespace;
    this_axon.host = host;
    this_axon.port = port;
    
    //note this is async, so everything below will get set first
    this_axon.tcp_connection = net.createConnection( port, host );

    //TODO eventually this could get big if we can't send them out for a while
    this_axon.message_buffer = [];

    //on connect we need to check if we have any messages in the
    //the message buffer, send them if so but first send a new
    //connect message
    var on_connect = function() {
    
        log.info( 'graphite connected' );
        
        this_axon.tcp_connection.setKeepAlive( true );
        
    	var connected_message_metric_path = 'nervous.connected';
    	var connected_message_value = '1';
    	var connected_message_timestamp = Math.floor( new Date / 1000.0 );
    	this_axon.fire( connected_message_metric_path, 
    				    connected_message_value, 
    				    connected_message_timestamp );
    
    	
    	//TODO eventually this could get big if we can't send them out for a while
        //TODO message will be lost if the write fails...
    	while( this_axon.message_buffer.length > 0) {
    
    	    var message = this_axon.message_buffer.shift();
    	    this_axon.tcp_connection.write( message );
    	}
	
    };
    this_axon.tcp_connection.on( 'connect', on_connect );

    var on_error = function( error ){
        
        //TODO create an error message and enque it
        //log error
        log.error( 'graphite connection error: ' + error );
        
        //destroy the connection so that reconnect fires
        this_axon.tcp_connection.destroy();
        
    };
    this_axon.tcp_connection.on( 'error', on_error );

    var on_close = function( ) {
	
	    //TODO create an end message
	    //log that we ended
        log.info( 'disconnected from graphite, reconnecting in 10000 ms' );
        
	    //reconnect after 10000 ms
        setTimeout( function () { 
            //need to reset the listeners?
            this_axon.tcp_connection.connect( this_axon.port, this_axon.host );
            
        }, 10000 );
        
    };
    this_axon.tcp_connection.on( 'close', on_close );

};
util.inherits( GraphiteAxon, events.EventEmitter );
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

    	log.error( 'write to graphite failed: ' + e );
    
    	//TODO need to resend these
    	this.message_buffer.push ( line );
    
    }    

};

GraphiteAxon.prototype.misfire = function( error ) {

    this_axon = this;

    log.error( 'misfire: ' + error );

    var name = 'nervous.misfire';
    this_axon.fire( name, 1 );
    
};
