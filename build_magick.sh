#!/bin/sh

unset MAKEFLAGS
unset SDKROOT

# We are building static libraries that will be included in a shared library
export CFLAGS="-fPIC"
export CXXFLAGS="-fPIC"
# Get the build flags from conan and shunt the auto-detection from the system
export PKG_CONFIG_LIBDIR=$(pwd)/build

cd deps/ImageMagick

# Do not include the utilities until they fix OpenJPEG on conan which requires deprecated glibc functions (finite-math)
sh ./configure $2 --prefix=$1/ImageMagick --disable-openmp --disable-shared --enable-static --disable-installed --without-utilities

make -j4 || true
make install
rm -rf $1/ImageMagick/lib/*.*a
