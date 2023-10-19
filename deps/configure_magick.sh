#!/bin/bash

exec 3>&1 4>&2 >../configure.log 2>&1

CONFIGURE_OPTS=""
if [ "$3" == "False" ]; then
    CONFIGURE_OPTS="--without-x"
fi

unset MAKEFLAGS
unset SDKROOT

# We are building static libraries that will be included in a shared library
export CFLAGS="-fPIC"
export CXXFLAGS="-fPIC"
# Get the build flags from conan and shunt the auto-detection from the system
export PKG_CONFIG_LIBDIR=$(pwd)/../build

cd ImageMagick
# Do not include the utilities which increase the size of the npm package
sh ./configure $2 --prefix=$1/ImageMagick                   \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl                      \
    --disable-docs                                          \
    ${CONFIGURE_OPTS}                                       \
    > /dev/null

X11_LIBS=`egrep -o '^\s*X11_LIBS\s*=.*' Makefile | cut -f 2 -d "="`
XEXT_LIBS=`egrep -o '^\s*XEXT_LIBS\s*=.*' Makefile | cut -f 2 -d "="`

cd ../..

LIBPATHS=`node -p "JSON.parse(fs.readFileSync('build/conanbuildinfo.json')).dependencies.map((dep) => dep.lib_paths).flat().map((path) => '-L' + path).join(' ')"`
LIBS=`node -p "JSON.parse(fs.readFileSync('build/conanbuildinfo.json')).dependencies.map((dep) => dep.libs).flat().map((path) => '-l' + path).join(' ')"`

exec 1>&3 2>&4

echo -n "${LIBPATHS} ${LIBS} ${X11_LIBS} ${XEXT_LIBS}"
