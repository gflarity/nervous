install: 
	/bin/mkdir -p /opt/nervous/bin
	/bin/mkdir -p /opt/nervous/log
	/bin/mkdir -p /opt/nervous/lib
	/bin/mkdir -p /opt/nervous/plugins/node_modules
	/usr/bin/install -m 0755 -t /opt/nervous/bin bin/nervous	
	/usr/bin/install -m 0644 -t /opt/nervous/lib lib/*


