include(default)

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
# Needed for libheif on Ubuntu 24.04
#tools.build:cflags=['-Wno-error=maybe-uninitialized']
#tools.build:cxxflags=['-Wno-error=maybe-uninitialized']
