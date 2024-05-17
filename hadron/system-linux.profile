include(default)

[replace_tool_requires]
meson/*: meson/1.3.1

[conf]
tools.build:sharedlinkflags=['-Wl,--exclude-libs,ALL']
tools.cmake.cmaketoolchain:generator=Ninja
