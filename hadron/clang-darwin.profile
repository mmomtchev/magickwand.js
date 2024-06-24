[settings]
arch=x86_64
build_type=Release
compiler=clang
compiler.cppstd=gnu17
compiler.version=17
compiler.libcxx=libc++
os=Macos

[conf]
tools.build:sharedlinkflags=['-static-libstdc++', '-static-libgcc']
tools.cmake.cmaketoolchain:generator=Ninja
