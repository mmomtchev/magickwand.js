#!/bin/sh

cd deps/ImageMagick
sh ./configure $2 --prefix=$1/ImageMagick --disable-shared --enable-static --disable-installed CFLAGS="-fPIC" CXXFLAGS="-fPIC" > /dev/null
grep MAGICK_LIBS Makefile | cut -f 2 -d "="
