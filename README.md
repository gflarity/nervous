# Nervous - Monitoring doesn't have to suck.

## About Nervous

Nervous is a simple plugin based monitoring system with support for sending data to Graphite or [Response](https://github.com/gflarity/response). Nervous makes it really easy to get data into graphite. 

Contributions in the form of code, plugins, documentation, spreading the word, high fives are all encouraged. Specifically I could use help creating startup scripts, packaging manifests for different platforms etc. 


## Quick Start:

1) Install/setup Graphite (optional)

2) Install Nervous by running 'sudo ./install.sh' (optional)

2) Copy the conf/nervous.json.example to conf/nervous.json and edit it.  If you don't have graphite then change system_type to 'stdout' instead.

3) start nervous up

   	 cd plugins
	 npm install ../example_plugins/*
	 cd ../
	 ./bin/nervous

4a) On linux you can install 'forvever' and copy the init.d script into place:

`
sudo npm install forever -g
sudo cp misc/init.d/nervous /etc/init.d/
sudo service nervous start
`

4b) On SmartOS or other illumos systems you can use the included SMF manifest:

`
sudo svccfg import misc/smf/nervous.xml
`

## Where to find plugins:

Search search.npmjs.org for nervous. Plugins conform to the naming convention 'nervous_plugin_<foo>' and there are already some there.


## How to write plugins:

Please take a look the included examples as well as those plugins available through npm. It's really easy:

`
//this oneliner loads the config.json in the plugin root dir
var config = JSON.parse( fs.readFileSync( require.resolve('./config.json') ) );

//export a single function, it gets an event emitter which you send out graphite data on as you like
module.exports = function( axon ) { 

	//do some stuff, usually inside of a 'setInterval' then:
	axon.emit( 'data',  name, value );

	//or:
	axon.emit( 'data', name, value, timestamp );
};
`


## How to test plugins:

Check out the test.js script inside the plugins directory. It takes a plugin name as a argument and then loads the plugin just like nervous would, only data just gets printed to stdout. Example:

`node test filesystem_usage`

## About Plugins: 

Plugins are just regular Node.js libraries/modules that conform to a certain convention to make them pluggable. They can be hosted on github and installed with NPM. Use your favourite configuration management system to install/deploy them. Configuration goes at the top of the plugin's index.js and should easily be templatable. They're expected to 'play nice' by not blocking the event loop, not overwhelming the system with events, and not tax the system's resources unecessarily. Some available plugins include cpu usage, filesystem size/usage,  memcached stats gathering. 

Plugins get loaded during startup. Inside the plugin you define how data gets retrieved. This is accomplished by using the 'setInterval' javascript function or an evented subscription.  


## Mailing List:

I will be creating a google group soon.


## IRC:

I will be creating a channel soon.



## Manifesto:

Graphite does a good job storing and presenting time series data. But I've yet to find satisfactory solution to the problem of *easily* gathering arbitrary hardware, operating system and application data to feed Graphite. Collectd comes closest, it has facilities for writting plugins in Perl, Python and Java. That's great but I had difficulty compiling the Perl plugin and interfaces seems needlessly complex. That said, for those chases where collectd already has a plugin satisfying your needs it's great. Nervous tries to provide a framework for easily creating your own custom monitoring plugins. These plugins are written in JavaScript and chances are good that you already know a little. But most importantly, Nervous tries to this and only this very well. 

"Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."

The ease with which plugins can be written in Node.js JavaScript is also advantage.  For these reasons I feel that Node.js is perfectly suited for writing a pluggable monitoring system.  












