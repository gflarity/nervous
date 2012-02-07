//deps
var net = require('net');
var util = require('util');
var events = require("events");
var streamlogger_helper = require('./streamlogger_helper');

var log = streamlogger_helper.getStreamLogger( 'main' );

//code
var STDOUTAxon = function ( namespace) {
    
    var this_axon = this;

    //setup parent
    events.EventEmitter.call(this_axon);
    
    this_axon.namespace = namespace;

    //setup our events, bind functions
    this_axon.on('data', this_axon.fire.bind( this_axon ) );    
    this_axon.on('error', this_axon.misfire.bind( this_axon ) );
    
};
util.inherits( STDOUTAxon, events.EventEmitter );
module.exports.STDOUTAxon = STDOUTAxon;

STDOUTAxon.prototype.fire = function( name, value, timestamp ) {

    this_axon = this;    
    
    //by default we generate the timestamp on fire, but it can be
    //overridden
    timestamp = timestamp || Math.floor(new Date()/1000);
    var metric_path = this_axon.namespace + '.' + name;
    var metric_value = value;
    var metric_timestamp = timestamp;
    var line = metric_path +  ' ' + metric_value + ' ' + metric_timestamp;

    console.log( line );

};


STDOUTAxon.prototype.misfire = function( err ) {

    this_axon = this;
    log.error(err);    
};


