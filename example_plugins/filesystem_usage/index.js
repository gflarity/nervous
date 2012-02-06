// configuration
var interval = 1*1000;
var filesystem = "/";
var filesystem_name = "root";

//deps
var child_process = require('child_process');

//code
//our plugin main function
module.exports = function( axon ) {

    var on_exec_complete = function( err, stdout, stderr ) {
    
        var lines = stdout.split('\n');
        var payload = lines[1];
    
        var matches = payload.match(/(\d+)\%/ );
    
        if ( matches && matches[1] ) {            
            capacity = matches[1];
            axon.emit( 'data',  filesystem_name, capacity );
        }
        else {
            axon.emit( 'error', 'match failed' );                
        }
    };
    
    //this checks it
    var check_filesystem_usage = function() {
        child_process.exec( 'df ' + filesystem, on_exec_complete );
    };

    setInterval( check_filesystem_usage, interval );
};



