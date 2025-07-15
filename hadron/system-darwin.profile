include(default)

[buildenv]
CC=xcrun clang
CXX=xcrun clang++
LD=xcrun ld
AR=xcrun ar
AS=xcrun as
RANLIB=xcrun ranliob
NM=xcrun nm
STRIP=xcrun strip
OBJDUMP=xcrun objdump

[settings]
compiler.cppstd=gnu20
