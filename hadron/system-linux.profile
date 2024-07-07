include(default)

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
tools.build:cflags=['-Wno-error=maybe-uninitialized']
tools.build:cxxflagss=['-Wno-error=maybe-uninitialized']
