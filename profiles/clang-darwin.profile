# For autotools-based projects we need GNU make
# It is not in the clang xpack but conan has it
# (we can't simply add it generally, because the recipe will also set
# the CMake generator for CMake-based projects)
[tool_requires]
libffi/*: make/4.4.1
libiconv/*: make/4.4.1
util-linux-libuuid/*: make/4.4.1
libmount/*: make/4.4.1
