include(default)

[settings]
compiler=gcc
compiler.version=11

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
