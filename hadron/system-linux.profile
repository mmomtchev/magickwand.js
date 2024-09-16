include(default)

[settings]
compiler=gcc

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
