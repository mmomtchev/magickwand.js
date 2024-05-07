include(default)

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
tools.cmake.cmaketoolchain:generator=Ninja
