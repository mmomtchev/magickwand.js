#!/bin/bash

unset MAKEFLAGS
unset SDKROOT

# Get the build flags from conan and shunt the auto-detection from the system
export EM_PKG_CONFIG_PATH=$(pwd)/../build

EMSDK_PATH=`node -p "JSON.parse(fs.readFileSync('../build/conanbuildinfo.json')).deps_env_info.EMSDK"`
. ${EMSDK_PATH}/emsdk_env.sh

cd ImageMagick
# Do not include the utilities which increase the size of the npm package
emconfigure ./configure $2 --prefix=$1/ImageMagick          \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl                      \
    --disable-docs                                          \
    > /dev/null

cd ../..

LIBPATHS=`node -p "JSON.parse(fs.readFileSync('build/conanbuildinfo.json')).dependencies.map((dep) => dep.lib_paths).flat().map((path) => '-L' + path).join(' ')"`
LIBS=`node -p "JSON.parse(fs.readFileSync('build/conanbuildinfo.json')).dependencies.map((dep) => dep.libs).flat().map((path) => '-l' + path).join(' ')"`

echo -n "${LIBPATHS} ${LIBS}"
