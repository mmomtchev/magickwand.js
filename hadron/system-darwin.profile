include(default)

{% set xcode_path = subprocess.check_output(['xcode-select', '-p'], text=True).strip() %}

[buildenv]
CC={{ xcode_path }}/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc
CXX={{ xcode_path }}/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++

[settings]
compiler.cppstd=gnu20

[conf]
tools.build:cflags=['-isysroot', '{{ xcode_path }}/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk']
tools.build:cxxflags=['-isysroot', '{{ xcode_path }}/Platforms/MacOSX.platform/Developer/SDKs/MacOSX.sdk']
