var net = require('net');

var STDOUTAxon = function ( namespace) {
    
    var this_axon = this;

    this_axon.namespace = namespace;

};
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
    console.log(err);    

};


