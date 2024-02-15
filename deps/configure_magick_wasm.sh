#!/bin/bash

exec 3>&1 4>&2 >../build/magick_configure.log 2>&1

unset MAKEFLAGS
unset SDKROOT

# Get the build flags from conan and shunt the auto-detection from the system
export EM_PKG_CONFIG_PATH=$(pwd)/../conan

EMSDK_PATH=`cat ../conan/conan_emsdk.path`
. ${EMSDK_PATH}/bin/emsdk_env.sh

cd ImageMagick
# Do not include the utilities which increase the size of the npm package
emconfigure ./configure $2 --prefix=$1/ImageMagick          \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl                      \
    --disable-docs                                          \
    > /dev/null

cd ../..

exec 1>&3 2>&4
