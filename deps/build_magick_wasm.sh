#!/bin/sh

unset MAKEFLAGS
unset SDKROOT

EMSDK_PATH=`cat ../conan/conan_emsdk.path`
. ${EMSDK_PATH}/bin/emsdk_env.sh

cd ImageMagick

emmake make -j4
make install
rm -rf $1/ImageMagick/lib/*.*a
