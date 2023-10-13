#!/bin/sh

unset MAKEFLAGS
unset SDKROOT

cd ImageMagick

make -j4
make install
rm -rf $1/ImageMagick/lib/*.*a
