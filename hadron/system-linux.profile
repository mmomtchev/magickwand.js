include(default)

[conf]
# This is what allows to override the link options
# when building a custom version, it will be
# automated in the future
tools.build:sharedlinkflags={{ os.getenv("npm_config_cpp_link_args").split() or ["-Wl,--exclude-libs,ALL"] }}
