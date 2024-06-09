include(default)

[settings]
# Alas, when shipping binaries for Windows, unless you do this,
# sooner or later, you will be very sorry
# Here is an example horror story: https://github.com/actions/runner-images/issues/10020
compiler.runtime=static
