# The complexity here is needed to deal with
# Macs that have multiple versions of XCode
# installed, especially when some system-installed
# libraries do not work with every XCode version
# (this is the case of some Github Actions runners)

# The templating here allows to correctly honor
# whatever the user set xcode-select to

# 99% of the Macs will work with nothing
# but include(default) and cppstd=gnu20

include(default)

{% set xcode_path = subprocess.check_output(['xcode-select', '-p'], text=True).strip() %}

[buildenv]
CC={{ xcode_path }}/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc
CXX={{ xcode_path }}/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++
LD={{ xcode_path }}/Toolchains/XcodeDefault.xctoolchain/usr/bin/ld

[settings]
compiler.cppstd=gnu20

[conf]
tools.build:cflags=[ '-isysroot', '{{ xcode_path }}/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk' ]
tools.build:cxxflags=[ '-isysroot', '{{ xcode_path }}/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk' ]
tools.build:sharedlinkflags=[ '-L{{ xcode_path }}/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk/usr/lib' ]
