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

{% set xcode_sdk_path = subprocess.check_output(['xcrun', '--show-sdk-path'], text=True).strip() %}

[buildenv]
CC={{ subprocess.check_output(['xcrun', '-f', 'cc'], text=True).strip() }}
CXX={{ subprocess.check_output(['xcrun', '-f', 'c++'], text=True).strip() }}
LD={{ subprocess.check_output(['xcrun', '-f', 'ld'], text=True).strip() }}

[settings]
compiler.cppstd=gnu20

[conf]
tools.build:cflags=[ '-isysroot', '{{ xcode_sdk_path }}' ]
tools.build:cxxflags=[ '-isysroot', '{{ xcode_sdk_path }}' ]
tools.build:sharedlinkflags=[ '-L{{ xcode_sdk_path }}/usr/lib' ]
