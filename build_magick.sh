#!/bin/sh

unset MAKEFLAGS
unset SDKROOT

cd deps/ImageMagick

make -j4
make install
rm -rf $1/ImageMagick/lib/*.*a
