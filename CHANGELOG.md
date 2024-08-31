# Changelog

# [2.0.0]

 - ImageMagick 7.1.1-36
 - Completely redesigned fully portable build using the new `hadron` build system (`xpm` + `meson / node-api` + `conan`)
   - Fully self-contained static build that does not depend on any system libraries (`conan`)
   - Identical on all three supported OS - Linux, Windows and macOS - and browser WASM (`meson / node-api`)
   - No other requirements for the host machine besides Node.js and `npm`
   - Optional built-in C++ compiler (`xpm`)
   - If rebuilding when installing, default build is now against the system-installed shared libraries
   - Fully configurable from the `npm install` command
   - New `CMake`-based build system for ImageMagick itself available as a stand-alone project targeted at portable open-source projects that distribute ImageMagick as source - https://github.com/mmomtchev/ImageMagick
   - Support rebuilding from source with Python 3.12 without `distutils`
 - Drop macOS 11 support
 - macOS 14 `arm64` prebuilt binaries and support for rebuilding from source on macOS 14 `arm64`
 - The generation of the SWIG wrappers and the `npm` package is now reproducible and hosted in Github Actions, and the generated wrappers are included in the published package
 - Drop X11 support from the prebuilt binaries for headless installation, X11 support now requires rebuilding from source
 - Fix [#220](https://github.com/mmomtchev/magickwand.js/issues/220), distortion methods require C-style arrays


## [1.1.0] 2024-04-17

 - New build system based on conan 2
 - Upgrade ImageMagick to the latest 7.1.1-30
 - Compatibility with Node.js 18.20.2 / 21.7.3 after https://github.com/nodejs/node/issues/52475
 - Drop Node.js 16 support
 
### [1.0.2] 2024-01-26

 - Upgrade ImageMagick to the latest 7.1.1-27 (git)
 - Fix [#73](https://github.com/mmomtchev/magickwand.js/issues/73), render `Image.fontTypeMetrics` usable from JS
 - Fix [#72](https://github.com/mmomtchev/magickwand.js/issues/72), exception in constructors used for implicit casting are not catchable
 - Fix [#71](https://github.com/mmomtchev/magickwand.js/issues/71), do not generate wrappers for the unusable from JS `Image.{get|set|read|write}Pixels`

### [1.0.1] 2024-01-18

 - Update ImageMagick to 7.1.1-26
 - Regenerate the wrappers with the published version of SWIG JSE

# [1.0.0] 2023-12-14

 - **`node-magickwand` becomes `magickwand.js`**
 - **WASM target for true dual environment 3+1 platforms support - native on Linux, macOS and Windows and WASM for browser JavaScript**
 - Now that browser JavaScript is supported, `Magick.Blob` uses an `ArrayBuffer`, to retrieve the underlying `ArrayBuffer` from a `Buffer` use `b.buffer` and to wrap an `ArrayBuffer` in a `Buffer` use `Buffer.from(ab)` - both of these do not actually copy the data and have no performance impact
 - Support building a *light* version by disabling delegate libraries
 - Update ImageMagick to 7.1.1-23
 - Fix [#66](https://github.com/mmomtchev/magickwand.js/issues/66), accept a JS array of `Magick.Coordinate` for methods that expect a `Magick::CoordinateList` aka `std::vector<Magick::Coordinate>`

### [0.9.7] 2023-10-12

 - Update `libwebp` to 1.3.2 to fix a number of recent critical vulnerabilities including CVE-2023-4863
 - Update ImageMagick to 7.1.1-20
 - Enable OpenMP in the pre-built binaries on Linux and macOS (it was already enabled on Windows)
 - Fix [#39](https://github.com/mmomtchev/magickwand.js/issues/39), do not install `conan` in the system directory
 - Add a number of generic version information getters to `MagickCore` including `MagickCore.GetMagickFeatures()` that allow to check the build configuration

### [0.9.6] 2023-10-04

 - Update ImageMagick to 7.1.1-19
 - Add support for ES6 named exports
 - Fix [#35](https://github.com/mmomtchev/magickwand.js/issues/35), do not allow `null` as an argument for `Magick.Image` 

### [0.9.5] 2023-09-25

 - Update ImageMagick to 7.1.1-18
 - Fix [#26](https://github.com/mmomtchev/magickwand.js/issues/26), crash when using `Image.display` multiple times
 - Update conan dependencies on POSIX
    - `glib` 2.76.2 to 2.78.0
    - `libjpeg-turbo` 2.1.5 to 3.0.0
    - `libtiff` 4.5.0 to 4.6.0
    - `libwebp` 1.3.0 to 1.3.1
    - `xz_utils` 5.4.2 to 5.4.4
 - Add `libdeflate` on Windows
 - Export all `MagickCore` macros to JavaScript - including `MagickCore.MagickLibAddendum`
 - Fix and test rebuilding against an externally installed ImageMagick-7
 - Remove some unused types to reduce code size and compilation times

### [0.9.4] 2023-09-19

 - Update ImageMagick to 7.1.1-16
 - Fully implement the security policy API
 - All SWIG-exported symbols are now configurable and writable with getters/setters also being enumerable
 - Eliminate all getters returning constant values and replace them with constants set at module initialization

### [0.9.3] 2023-09-17

 - Fix [#20](https://github.com/mmomtchev/magickwand.js/issues/20), rebuilding when installing from `npm` fails on macOS/Linux with `fatal error: MagickCore/magick-baseconfig.h: No such file or directory`
 - Fix [#21](https://github.com/mmomtchev/magickwand.js/issues/21), rebuilding when installing from `npm` fails on Windows `npm ERR! fatal: not a git repository (or any of the parent directories): .git`

### [0.9.2] 2023-09-16

 - Fix [#14](https://github.com/mmomtchev/magickwand.js/issues/14), rebuilding when installing from `npm` fails
 - Fix [#19](https://github.com/mmomtchev/magickwand.js/issues/19), possible memory corruption issue when throwing asynchronously on macOS

### [0.9.1] 2023-09-15

 - Fix [#17](https://github.com/mmomtchev/magickwand.js/issues/17), crashes with `undefined symbol ...` on Linux when invoking methods in MagickWand such as `AnimateImages`

## [0.9.0] 2023-09-14

- TypeScript support
- Implicit convenience casting from strings to `Magick.Geometry` and `Magick.Color`, allows to write `new Magick.Image('640x480', 'black')` instead of `new Magick.Image(new Magick.Geometry('640x480'), new Magick.Color('black'))`
- Fix numerous leaks in the error paths of most methods that take string arguments

## [0.1.0] 2023-07-30

- `*Async` versions of most CPU-heavy classes, including `Image` and the filters

### [0.0.5] 2023-05-11

- Fully self-contained build with conan that can produce an universal binary on POSIX
- Fix and test the `DrawablePath` API

### [0.0.4] 2023-05-06

- Fix and test automatic rebuilding when installing from npm

### [0.0.3] 2023-05-05

- Render the package compatible with Node.js 14.x / 16.x

### [0.0.2] 2023-05-05

- Fix the install script

### [0.0.1] 2023-05-05

- First alpha release
