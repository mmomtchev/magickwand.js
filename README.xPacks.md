# Using `xPacks` for a fully self-contained build

The most complex form of `hadron` allows to create `npm` packages that can rebuild themselves on all supported platforms (currently Linux x86-64, Windows x86-64, macOS x86-64 and macOS arm8) without assuming anything about the end user host besides a working Node.js installation.

This mode is to be considered highly experimental and this document tries to summarize what is currently possible.

It is currently used in [`magickwand.js`](https://github.com/mmomtchev/magickwand.js) as an experimental demonstration build.

It is also available in the two template projects: [`hadron-swig-napi-example-project`](https://github.com/mmomtchev/hadron-swig-napi-example-project) and [`hadron-nobind-example-project`](https://github.com/mmomtchev/hadron-nobind-example-project). As very often, the devil is in the details, and the hard part is making all the 3rd party dependencies work in this configuration. This project contains an example of a complex project with many `conan` dependencies that can be fully rebuild using (almost) only Node.js.

## Overview

### The Good

The very ambitious `LLVM/clang` project aims to deliver the very first completely cross-platform, and completely unencumbered by any licenses, C/C++ compiler that is fully self-sufficient and produces native binaries on every platform - including Windows. In 2024, its version 18 comes very close to this goal. Combined with truly cross-platform build systems such as CMake and meson, this allows for an unprecedented uniformity across all platforms. `hadron`s own xPacks include the modified `meson`, a recent `conan` distribution and a fully self-sufficient Python to run them. CMake and `ninja` are also available from the base xPack distribution. Using `conan` is optional, but highly recommended, since many of the compiler abstraction problems tend to be already solved. The other alternative is to distribute these in the source tarball and to integrate them in the main `meson` build - which will work quite well for other `meson`-based or CMake-based projects - but it will be far more difficult for `autotools`-based ones.

### The Bad

Many third party projects tend to break in some way, most often because of making the false assumption that Linux = `gcc` and Windows = `MSVC`. This is worst on Linux where the domination of `gcc`, which is also free and there is little motivation to not use it, has been the most total. However in 2024 the situation is definitely improving and more and more projects include a `clang` build.

### The Ugly

`autotools`-based projects are always a dice roll and tend to break in various unexpected ways on Windows. Those that support being built with `gcc-mingw32` generally fare better than the others. Compiling one of them is already a challenge, but building many of them and making them work together is even more difficult. `MSYS2`/`cygwin` vs `MinGW` is also a huge issue. On Linux, no one ever tests building C/C++ on a system where there is no `gcc` and no `ld` installed and this tends to trigger many bugs.

## Common to all OS

For CMake-based projects, it is recommended to use the `ninja` build, as it minimizes the amount of fixing build problems. It cannot be avoided as there are no free alternatives for Windows. For `autotools`-based projects, it is recommended to manually include GNU Make.

## Linux

Paradoxically, Linux, is the last system on which `LLVM/clang` is not fully self-sufficient. As `gcc` is also free and Linux features a very tight integration between the OS and C/C++ compiler, separating them in a clean way has proven to be a challenge. Currently, when using the xPack build, the target host must have (package names follow the Ubuntu/Debian scheme):
* `libc6-dev` - On UNIX, the system include header files (`/usr/include`) are considered part of the system, not the compiler. As such, these come from the `glibc` project and not the `gcc` project. This includes the `crt1.o` process startup and shutdown routines. This part currently has no alternatives.
* `libstdc++-dev` - `LLVM/clang` comes now with its own `libc++` alternative C++ standard library, that is the default one on all systems besides Linux. In 2024 the Linux version works quite well and can fully replace the `gcc`-provided one - but you will be venturing even further in uncharted territory and if you have a large number of 3rd party dependencies, it is very likely that at least one will be incompatible. Use `-stdlib=c++` to enable it and avoid this dependency.
* `libgcc-11-dev` - Since very recently, `LLVM/clang` includes its own C runtime - this is mostly functions such as `malloc` and `free` - that works best when used with the `libc++` library. Once again, some projects might break. Use `-rtlib=compiler-rt` to enable it and avoid this dependency.
* `binutils` - The original GNU linker `ld`. `LLVM/clang` has `lld`. Not having it installed triggers a bug in `meson`: https://github.com/mmomtchev/hadron/issues/41
* `openssl` (actually `ca-certificates`) - OpenSSL itself is compiled statically in every binary, but currently there is no alternative distribution of root SSL certificates and many binaries will expect to find `/etc/ssl`.

As an alternative to requiring all those dependencies - except the certificate - the existing `gcc` xPack can be included.

For `autotools`-based projects, GNU Make will also have to be included - which this project selectively applies in its `conan` profiles. Or it can be expected to be already present on the target system.

## macOS

On macOS things tend to be pretty smooth as this is the system where the built-in compiler is the one that is the most similar - however note that Apple `clang` is not exactly the same as `LLVM/clang` of which it is a fork. Currently, the only Homebrew package that is required is:
* `openssl` - For the same reasons as Linux. Recent macOS versions come with a built-in Apple-modified `LibreSSL` that has its own root SSL certificates. Maybe these can be used with some custom code.

For `autotools`-based projects, GNU Make will also have to be included - which this project selectively applies in its `conan` profiles. Or it can be expected to be already present on the target system.

## Windows

Windows remains the least used `clang` platform - and the one where `clang` is the most different from the vendor's default compiler. However in 2024, Microsoft is now distributing it along the latest Visual Studio and they have made great efforts towards fully integrating it. It can even build against `MSVC`'s own C++ library - producing fully native binaries - however this is of no interest to `hadron` since this runtime is not freely redistributable. `hadron` uses `libc++` for C++. The low-level C runtime used is the older, but widely available on every Windows installation, `crt.lib` that does not require from the user to install anything.

The worst problems on Windows are usually the `autotools`-based projects. `MSYS2` offers a very good fully integrated environment for these, but some `conan` recipes expect that the compiler is also `MSYS2` compatible. A possible alternative would be using a native `bash` with a native GNU Make, but this will require manual handling of the Windows-style paths.
