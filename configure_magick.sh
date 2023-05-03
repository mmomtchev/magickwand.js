#!/bin/sh

unset MAKEFLAGS

cd deps/ImageMagick
CFLAGS="-fPIC"
sh ./configure $2 --prefix=$1/ImageMagick --disable-shared --enable-static --disable-installed CFLAGS="${CFLAGS}" CXXFLAGS="${CFLAGS}" > /dev/null
grep MAGICK_LIBS Makefile | cut -f 2 -d "="
