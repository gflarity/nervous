# Nervous - Monitoring doesn't have to suck.


## Manifesto:

Graphite does a good job storing and presenting time series data. But I've yet to the perfect solution to the problem of gathering hardware, operating system and application data to feed Graphite. Collectd comes closest, but I feel that using C is overkill (these days) and more importantly creates a unecessary barrier to plugin development. 

"Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices."

The ease with which plugins can be written in Node.js JavaScript is also advantage.  For these reasons I feel that Node.js is perfectly suited for writing a pluggable monitoring system.  Nervous is the embodiment of these beliefs, it is a simple plugin based monitoring system with support for sending data to Graphite (or Response). It follows the 'convention over configuration' and 'keep it simple shithead' ethea.

Contributions in the form of code, plugins,  documentation, spreading the word, high fives are all encouraged. Specifically I could use help creating startup scripts, packaging manifests for different platforms etc. 

## About Plugins: 

Plugins are just regular Node.js libraries/modules that conformi to a certain convention to make them pluggable. They can be hosted on github and installed with NPM. Use your favourite configuration management system to install/deploy them. Configuration goes at the top of the plugin's index.js and should easily be templatable. They're expected to 'play nice' by not blocking the event loop, not overwhelming the system with events, and not tax the system's resources unecessarily. Some available plugins include cpu usage, filesystem size/usage,  memcached stats gathering. 

Plugins get loaded during startup. Inside the plugin you define how data gets retrieved. This is accomplished by using the 'setInterval' javascript function or an evented subscription.  


## Quick Start:

Under construction. Soon there will be make install support. I'm considering including optional support for forever. 


## Where to find plugins:

under construction. My current plan is to use a namespace convention for the NPM repostiory. Something like nervous_plugin_foo. Suggestions welcome. 


## How to write plugins:

Examples under construction. Please take a look the following examples and follow the conventions you see there. 
Please include all module dependencies with your plugins. The idea is to make it incredibly simple to install and configure plugins. 


## How to test plugins:

Check out the test.js script inside the plugins directory. It takes a plugin directory as a argument and then loads the plugin just like nervous would, only data just gets printed to stdout.


## Mailing List:

I will be creating a google group soon.


## IRC:

I will be creating a channel soon.












