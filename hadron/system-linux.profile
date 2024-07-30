include(default)

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
tools.build:cflags=['-Wno-error=maybe-uninitialized']
tools.build:cxxflags=['-Wno-error=maybe-uninitialized']
