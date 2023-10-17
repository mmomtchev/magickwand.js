#!/bin/sh

unset MAKEFLAGS
unset SDKROOT

EMSDK_PATH=`node -p "JSON.parse(fs.readFileSync('../build/conanbuildinfo.json')).deps_env_info.EMSDK"`
. ${EMSDK_PATH}/emsdk_env.sh

cd ImageMagick

emmake make -j4
make install
rm -rf $1/ImageMagick/lib/*.*a
