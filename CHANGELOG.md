# Changelog

### [0.9.6] 2023-10-04

 - Update ImageMagick to 7.1.1-19
 - Add support for ES6 named exports
 - Fix [#35](https://github.com/mmomtchev/node-magickwand/issues/35), do not allow `null` as an argument for `Magick.Image` 

### [0.9.5] 2023-09-25

 - Update ImageMagick to 7.1.1-18
 - Fix [#26](https://github.com/mmomtchev/node-magickwand/issues/26), crash when using `Image.display` multiple times
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

 - Fix [#20](https://github.com/mmomtchev/node-magickwand/issues/20), rebuilding when installing from `npm` fails on macOS/Linux with `fatal error: MagickCore/magick-baseconfig.h: No such file or directory`
 - Fix [#21](https://github.com/mmomtchev/node-magickwand/issues/21), rebuilding when installing from `npm` fails on Windows `npm ERR! fatal: not a git repository (or any of the parent directories): .git`

### [0.9.2] 2023-09-16

 - Fix [#14](https://github.com/mmomtchev/node-magickwand/issues/14), rebuilding when installing from `npm` fails
 - Fix [#19](https://github.com/mmomtchev/node-magickwand/issues/19), possible memory corruption issue when throwing asynchronously on macOS

### [0.9.1] 2023-09-15

 - Fix [#17](https://github.com/mmomtchev/node-magickwand/issues/17), crashes with `undefined symbol ...` on Linux when invoking methods in MagickWand such as `AnimateImages`

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
