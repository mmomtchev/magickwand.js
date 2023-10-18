include(default)

[settings]
os=Emscripten
arch=wasm
compiler=clang
compiler.libcxx=libc++

[conf]
tools.build:cflags=['-pthread']
tools.build:cxxflags=['-pthread']
tools.build:sharedlinkflags=['-pthread', '-sDEFAULT_PTHREAD_STACK_SIZE=1MB', '-sSTACK_SIZE=1MB']

[options]

[tool_requires]
emsdk/3.1.44

[env]
