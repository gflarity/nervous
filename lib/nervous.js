//deps
var fs = require('fs');
var path = require('path');
var steamlogger_helper = require('./streamlogger_helper');

//code
var load_plugins = function () {
    var full_path_of_config = require.resolve( '../conf/nervous.json' );
    debugger;
    var root_path = path.resolve(full_path_of_config, '../..');    

    //get a logger for for a log file relative to this path with the id 'main'
    var logger = steamlogger_helper.createStreamLogger( 'main', root_path + '/log/nervous.log');
    
    var config = JSON.parse(fs.readFileSync( full_path_of_config ) );
    
    var system_type = config.system_type;
    var axon_factory = require('../lib/axon_factory')( system_type, config );
    
    var plugins_home = '../plugins';
    var full_path_of_test_js =  require.resolve( plugins_home + '/test.js' );
    var full_plugins_path = path.dirname( full_path_of_test_js ) + '/node_modules';

    fs.readdir(full_plugins_path, function(err, entries) {
        var dirs = [];
        entries = entries || [];
        entries.forEach(function(entry) {
            var plugin = full_plugins_path + '/' + entry;
            fs.stat(plugin, function(err, stats) {
                if (stats.isDirectory()) {
               
                    //if there's a nervous_plugin_ in our module name, strip it 
                    var subspace = entry.replace(/^nervous_plugin_/, '');
                    
                    //load the plugin and give it a sub namespace, aka subspace
                    require(plugin)(axon_factory(subspace));
                }
            });
        });
	    

	}

	);
};

module.exports = function() {    
    load_plugins();
};
