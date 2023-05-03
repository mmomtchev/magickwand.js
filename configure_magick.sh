#!/bin/sh

cd deps/ImageMagick
sh ./configure $1 --disable-shared --enable-static CFLAGS="-fPIC" CXXFLAGS="-fPIC" > /dev/null
grep MAGICK_LIBS Makefile | cut -f 2 -d "="
