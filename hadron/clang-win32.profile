[buildenv]
# This is needed because on Windows xpm uses npm-style .cmd redirects
# from xpacks/.bin to the actual installation directory
CC=clang.cmd
CXX=clang++.cmd
LD=clang-ld.cmd
AR=llvm-ar.cmd
RANLIB=llvm-ranlib.cmd
AS=x86_64-w64-mingw32-as.cmd
NM=llvm-nm.cmd
STRIP=llvm-strip.cmd
OBJDUMP=llvm-objdump.cmd

[settings]
arch=x86_64
build_type=Release
compiler=clang
compiler.cppstd=gnu17
compiler.version=17
compiler.libcxx=libc++
os=Windows

[conf]
tools.build:sharedlinkflags=['-static-libstdc++']
tools.gnu:make_program=make.cmd
# a better solution might be in the works:
# https://github.com/conan-io/conan/issues/15544
tools.cmake.cmaketoolchain:extra_variables={'CMAKE_AR': 'llvm-ar.cmd', 'CMAKE_RANLIB': 'llvm-ranlib.cmd', 'CMAKE_AS': 'x86_64-w64-mingw32-as.cmd', 'CMAKE_NM': 'llvm-nm.cmd', 'CMAKE_STRIP': 'llvm-strip.cmd', 'CMAKE_OBJDUMP': 'llvm-objdump.cmd'}
