#!/bin/sh

unset MAKEFLAGS
unset SDKROOT

cd deps/ImageMagick

make -j4
