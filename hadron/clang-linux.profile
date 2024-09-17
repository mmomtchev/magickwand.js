[buildenv]
CC=clang
CXX=clang++
LD=ld.lld
AR=llvm-ar
RANLIB=llvm-ranlib
NM=llvm-nm
STRIP=llvm-strip
OBJDUMP=llvm-objdump

[settings]
arch=x86_64
build_type=Release
compiler=clang
compiler.cppstd=gnu17
compiler.version=17
compiler.libcxx=libstdc++11
os=Linux

[conf]
# By using clang we are already out of the paved road
tools.cmake.cmaketoolchain:generator=Ninja
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL', '-static-libstdc++', '-static-libgcc', '-fuse-ld=lld']
tools.build.exelinkflags=['-static-libstdc++', '-static-libgcc', '-fuse-ld=lld']
tools.cmake.cmaketoolchain:extra_variables={'CMAKE_LINKER': 'ld.lld', 'CMAKE_AR': 'llvm-ar', 'CMAKE_RANLIB': 'llvm-ranlib', 'CMAKE_NM': 'llvm-nm', 'CMAKE_STRIP': 'llvm-strip', 'CMAKE_OBJDUMP': 'llvm-objdump'}
