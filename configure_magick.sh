#!/bin/bash

unset MAKEFLAGS
unset SDKROOT

# We are building static libraries that will be included in a shared library
export CFLAGS="-fPIC"
export CXXFLAGS="-fPIC"
# Get the build flags from conan and shunt the auto-detection from the system
export PKG_CONFIG_LIBDIR=$(pwd)/build

cd deps/ImageMagick
# Do not include the utilities which increase the size of the npm package
sh ./configure $2 --prefix=$1/ImageMagick                   \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl --disable-openmp     \
    --disable-docs                                          \
    > /dev/null

X11_LIBS=`egrep -o '^\s*X11_LIBS\s*=.*' Makefile | cut -f 2 -d "="`
XEXT_LIBS=`egrep -o '^\s*XEXT_LIBS\s*=.*' Makefile | cut -f 2 -d "="`

cd ../..

cat build/conanbuildinfo.args | sed 's/-framework.*//g;
    s/[[:space:]]\+-m64[[:space:]]\+/ /g;
    s/[[:space:]]\+-O3[[:space:]]\+/ /g;
    s/[[:space:]]\+-s[[:space:]]\+/ /g;
    s/[[:space:]]\+-DNDEBUG[[:space:]]\+/ /g;'
echo -n " ${X11_LIBS} ${XEXT_LIBS}"
