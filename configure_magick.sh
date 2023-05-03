#!/bin/sh

cd deps/ImageMagick
CFLAGS="-fPIC"
case $(uname) in
  Darwin) CFLAGS="${CFLAGS} -I/usr/local/include" ;;
esac 
sh ./configure $2 --prefix=$1/ImageMagick --disable-shared --enable-static --disable-installed CFLAGS="${CFLAGS}" CXXFLAGS="${CFLAGS}" > /dev/null
grep MAGICK_LIBS Makefile | cut -f 2 -d "="
