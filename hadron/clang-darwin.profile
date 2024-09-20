[buildenv]
CC=clang
CXX=clang++
LD=ld64.lld
AR=llvm-ar
AS=llvm-as
RANLIB=llvm-ranlib
NM=llvm-nm
STRIP=llvm-strip
OBJDUMP=llvm-objdump

[settings]
arch={{ {"arm64": "armv8"}.get(platform.machine(), platform.machine()) }}
build_type=Release
compiler=clang
compiler.cppstd=gnu17
compiler.version=17
compiler.libcxx=libc++
os=Macos

# For autotools-based projects
# (we can't simply add it generally, because the recipe will also set
# the CMake generator for CMake-based projects)
[tool_requires]
libffi/*: make/4.4.1
libiconv/*: make/4.4.1
util-linux-libuuid/*: make/4.4.1
xz_utils/*: make/4.4.1
libmount/*: make/4.4.1
libxml2/*: make/4.4.1

[conf]
# By using clang we are already out of the paved road
tools.cmake.cmaketoolchain:generator=Ninja
tools.build:sharedlinkflags=['-fuse-ld=lld']
tools.build:exelinkflags=['-fuse-ld=lld']
tools.cmake.cmaketoolchain:extra_variables={'CMAKE_LINKER': 'ld64.lld', 'CMAKE_AR': 'llvm-ar', 'CMAKE_AS': 'llvm-as', 'CMAKE_RANLIB': 'llvm-ranlib', 'CMAKE_NM': 'llvm-nm', 'CMAKE_STRIP': 'llvm-strip', 'CMAKE_OBJDUMP': 'llvm-objdump'}
