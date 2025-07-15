include(default)

[buildenv]
CC=/Applications/Xcode_16.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/cc
CXX=/Applications/Xcode_16.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++

[settings]
compiler.cppstd=gnu20

[conf]
tools.build:cflags=['-isysroot', '/Applications/Xcode_16.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX15.0.sdk']
tools.build:cxxflags=['-isysroot', '/Applications/Xcode_16.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX15.0.sdk']
