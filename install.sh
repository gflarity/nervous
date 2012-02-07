set -e

UNAME=`uname`;
INSTALL='install'
if [ $UNAME = 'Darwin' ]; then
    if which -s ginstall; then 
	INSTALL='ginstall'
    else 
	echo "Hi Mac user, please install coreutils via brew"
    fi
fi

DEFAULT_PREFIX=/opt
PREFIX=${PREFIX:-$DEFAULT_PREFIX}

/bin/mkdir -p $PREFIX/nervous/bin
/bin/mkdir -p $PREFIX/nervous/log
/bin/mkdir -p $PREFIX/nervous/lib
/bin/mkdir -p $PREFIX/nervous/conf
/bin/mkdir -p $PREFIX/nervous/plugins/node_modules
$INSTALL -m 0755 -t $PREFIX/nervous/bin bin/nervous	
$INSTALL -m 0644 -t $PREFIX/nervous/plugins plugins/test.js
$INSTALL -m 0644 conf/nervous.json $PREFIX/nervous/conf/nervous.json.example
$INSTALL -m 0644 -t $PREFIX/nervous/lib lib/*js
