include(default)

[buildenv]
CC={{ os.getenv("EMCC") or "emcc" }}
CXX={{ os.getenv("EMCXX") or "em++" }}

[settings]
os=Emscripten
arch=wasm
compiler=clang
compiler.libcxx=libc++
compiler.version=17

[conf]
tools.build:cflags=['-pthread']
tools.build:cxxflags=['-pthread']
tools.build:sharedlinkflags=['-pthread', '-sDEFAULT_PTHREAD_STACK_SIZE=2MB', '-sSTACK_SIZE=2MB']

[options]

[tool_requires]
emsdk/3.1.73
