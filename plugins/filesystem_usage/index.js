// configuration
var interval = 10*1000;
var filesystem = "/";

//deps
var child_process = require('child_process');

//code
var on_exec_complete = function( err, stdout, stderr ) {

    var lines = stdout.split('\n');
    var payload = lines[1];

    var matches = payload.match(/(\d+)\%/ );

    console.log(matches[1]);



};


//this checks it
var check_filesystem_usage = function() {
    child_process.exec( 'df ' + filesystem, on_exec_complete );
};


//our plugin main function
module.exports = function( config ) {

    setInterval( check_filesystem_usage, interval );
};
