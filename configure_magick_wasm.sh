#!/bin/bash

# Get the build flags from conan and shunt the auto-detection from the system
#export PKG_CONFIG_LIBDIR=$(pwd)/build

cd deps/ImageMagick
# Do not include the utilities which increase the size of the npm package
emconfigure ./configure                                     \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl                      \
    --disable-docs                                          \
