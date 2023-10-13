#!/bin/bash

unset MAKEFLAGS
unset SDKROOT

# Get the build flags from conan and shunt the auto-detection from the system
export EM_PKG_CONFIG_PATH=$(pwd)/build

EMSDK_PATH=`node -p "JSON.parse(fs.readFileSync('../build/conanbuildinfo.json')).deps_env_info.EMSDK"`
. ${EMSDK_PATH}/emsdk_env.sh

cd ImageMagick
# Do not include the utilities which increase the size of the npm package
emconfigure ./configure $1                                  \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl                      \
    --disable-docs                                          \
    > /dev/null

cd ../..

cat build/conanbuildinfo.args | sed 's/-framework.*//g;
    s/[[:space:]]\+-m64[[:space:]]\+/ /g;
    s/[[:space:]]\+-O3[[:space:]]\+/ /g;
    s/[[:space:]]\+-s[[:space:]]\+/ /g;
    s/[[:space:]]\+-Wl,-rpath[^[:space:]]\+//g;
    s/[[:space:]]\+-DNDEBUG[[:space:]]\+/ /g;'
