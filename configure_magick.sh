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
sh ./configure $2 --prefix=$1/ImageMagick --disable-openmp --disable-shared --enable-static --disable-installed --without-utilities > /dev/null
cd ../..

cat build/conanbuildinfo.args

case `uname` in
  Linux) echo -n " -lXext -lXt -lSM -lICE -lX11" ;;
  Darwin) echo -n " -lXext -lX11" ;;
esac
