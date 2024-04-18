include(default)

[settings]
os=Emscripten
arch=wasm
compiler=clang
compiler.libcxx=libc++
compiler.version=17

[conf]
tools.build:sharedlinkflags=['-sSTACK_SIZE=2MB']

[options]

[tool_requires]
emsdk/3.1.50
