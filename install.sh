set -e
DEFAULT_PREFIX=/opt
PREFIX=${PREFIX:-$DEFAULT_PREFIX}

/bin/mkdir -p $PREFIX/nervous/bin
/bin/mkdir -p $PREFIX/nervous/log
/bin/mkdir -p $PREFIX/nervous/lib/node_modules
/bin/mkdir -p $PREFIX/nervous/conf
/bin/mkdir -p $PREFIX/nervous/plugins/node_modules
cp bin/nervous $PREFIX/nervous/bin/
cp plugins/test.js $PREFIX/nervous/plugins/
cp conf/nervous.json $PREFIX/nervous/conf/nervous.json.example
cp lib/*js $PREFIX/nervous/lib/
cp -r lib/node_modules/* $PREFIX/nervous/lib/node_modules/
