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
NINJA=ninja.cmd
RC=llvm-windres.cmd
WINDRES=llvm-windres.cmd
# This is the only way to bring in the ninja xPack on Windows where ninja is called ninja.cmd
# until conan implements a tools.cmake.make_program settings item
PATH=+(path){{ os.path.dirname(os.getenv("npm_package_json")).replace("\\", "/") }}/xpacks/@xpack-dev-tools/ninja-build/.content/bin

[settings]
arch=x86_64
build_type=Release
compiler=clang
compiler.cppstd=gnu17
compiler.version=17
os=Windows

[conf]
# clang tends to be pickier than MSVC when it comes to C/C++ compliance
tools.build:cflags=['-Wno-incompatible-function-pointer-types']
tools.build:sharedlinkflags=['-l:libc++.a', '-static-libgcc']
tools.build:exelinkflags=['-l:libc++.a', '-static-libgcc']
# The second most probable to work generator on Windows is Ninja
# (the first one is not free)
tools.cmake.cmaketoolchain:generator=Ninja
# a better solution might be in the works:
# https://github.com/conan-io/conan/issues/15544
tools.cmake.cmaketoolchain:extra_variables={'CMAKE_AR': 'llvm-ar.cmd', 'CMAKE_RANLIB': 'llvm-ranlib.cmd', 'CMAKE_AS': 'x86_64-w64-mingw32-as.cmd', 'CMAKE_NM': 'llvm-nm.cmd', 'CMAKE_STRIP': 'llvm-strip.cmd', 'CMAKE_OBJDUMP': 'llvm-objdump.cmd'}
