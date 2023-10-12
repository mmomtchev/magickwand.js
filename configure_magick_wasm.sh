#!/bin/bash

# Get the build flags from conan and shunt the auto-detection from the system
export EM_PKG_CONFIG_PATH=$(pwd)/build

cd deps/ImageMagick
# Do not include the utilities which increase the size of the npm package
emconfigure ./configure                                     \
    --disable-installed                                     \
    --disable-shared --enable-static                        \
    --without-utilities --without-perl                      \
    --disable-docs                                          \

cd ../..

cat build/conanbuildinfo.args | sed 's/-framework.*//g;
    s/[[:space:]]\+-m64[[:space:]]\+/ /g;
    s/[[:space:]]\+-O3[[:space:]]\+/ /g;
    s/[[:space:]]\+-s[[:space:]]\+/ /g;
    s/[[:space:]]\+-Wl,-rpath[^[:space:]]\+//g;
    s/[[:space:]]\+-DNDEBUG[[:space:]]\+/ /g;' > build/conan.wasm.args
