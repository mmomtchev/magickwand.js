# magickwand.js

**Update: since Oct 24 2024 I am homeless and living in my van. I lost access to most of my computer hardware. The eviction from my home has been timed for maximum effect as I was not present when it happened. Please, if you use my software, consider asking everyone around you if they are taking part in this extortion and why.**

[![ISC](https://img.shields.io/github/license/mmomtchev/magickwand.js)](https://github.com/mmomtchev/magickwand.js/blob/main/LICENSE)
[![Test npm package](https://github.com/mmomtchev/magickwand.js/actions/workflows/test-package.yml/badge.svg)](https://github.com/mmomtchev/magickwand.js/actions/workflows/test-package.yml)
[![Node.js CI](https://github.com/mmomtchev/magickwand.js/actions/workflows/test-dev.yml/badge.svg)](https://github.com/mmomtchev/magickwand.js/actions/workflows/test-dev.yml)
[![npm](https://img.shields.io/npm/v/magickwand.js)](https://www.npmjs.com/package/magickwand.js)

##### *formerly known as `node-magickwand`*

This package is a full native port of the ImageMagick-7 C++ library to both Node.js native and browser WASM using [SWIG Node-API](https://www.swig.org/) + [`emnapi`](https://toyobayashi.github.io/emnapi-docs/guide/).

Unlike all other ImageMagick `npm` packages, it does not use the CLI to interact with the utilities, but offers direct access to the full C++ API. It supports both synchronous and multithreaded asynchronous operations, it is integrated with `TypedArray`s and `ArrayBuffer` and it has full TypeScript support.

It adds many new features and offers a substantial performance boost and usability benefits over the previous CLI ports.

The Node.js native addon version and the browser WASM version share the same SWIG interface files, the same generated C++ wrappers, the same API, the same TypeScript bindings and the same unit tests which are run both in the browser and in Node.js. Both support asynchronous parallel processing using the same multi-threading model.

The pre-built binaries are fully self-contained and do not need an existing ImageMagick installation. It is also possible to rebuild the package against a shared ImageMagick-7 when using the native version in Node.js.

The default WASM version is also fully self-contained and its size range is from 1.7MB (*minimal, compressed w/ brotli*) to 5.6MB (*default full build compressed w/ gzip*) depending on the supported image formats.

Both versions support synchronous and asynchronous multi-threaded operations with an identical API and identical TypeScript bindings. WASM requires `SharedArrayBuffer` (read about [COOP / COEP](https://web.dev/articles/coop-coep)). The Node.js native version also support OpenMP multithreading and SIMD instructions.

The project is very actively developed and maintained because of it its special status as SWIG Node-API showcase project. It is a testament to SWIG Node-API's capabilities, namely producing a 400k C++ lines multi-threaded and dual-environment project out of 600 lines of SWIG code.

It is feature-complete and it should be reasonably stable. The Node.js native version is designed to be well-suited for server-side use with an Express.js-like framework. It has been debugged for memory leaks and, and when only asynchronous methods are used, it should never block the event loop. See also [Security](#security).

There is also a [medium article about using the new Node-API support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f) in case you are interested in porting another C++ library to Node.js.

## Usage

### Installation

```shell
npm install magickwand.js
```

This will install pre-built Node.js native binaries on Windows x64, Linux x64 and macOS x64 and arm64. It will try to compile the module on all other platforms. It will also install the pre-built WASM binaries which are universal. The prebuilt binaries are statically linked to the (almost) full set of supported libraries by ImageMagick and are very large. See below for alternatives.

Refer to the [`example`](https://github.com/mmomtchev/magickwand.js/tree/main/example) directory for more code examples including browser use examples.

Refer to the [`test/integration`](https://github.com/mmomtchev/magickwand.js/tree/main/test/integration) directory for integration examples with various environments including `webpack` and TypeScript.

### Importing

Starting from 2.0, ES6 2020 projects can import `magickwand.js` in fully automatic mode, using Node.js 16 [`exports`](https://nodejs.org/api/packages.html#exports-sugar). This means that a single `import` statement can be evaluated by both Node.js or a modern web bundler such as `webpack` (including React) or `rollup` to pick either the native version or the WASM version depending on the context.

```js
import ImageMagick from 'magickwand.js';
// ImageMagick will be either a native library
// (if called from a Node.js application)
// or a WASM bundle (when bundled by a web bundler)
const { Magick, MagickCore } = await ImageMagick;
```

The only downside is that this requires ES6 2020 top-level `await`. If you are using TypeScript, you will have to transpile to ES2020.

There is an alternative, synchronous, entry point that works only in Node.js. It is compatible with both CJS and ES6. It uses [`@guybedford`](https://github.com/guybedford)'s [CJS named exports in Node.js](https://github.com/nodejs/node/pull/35249).

```js
const { Magick, MagickCore } = require('magickwand.js/native');
```

### Example

Using ES6 2020 and top-level `await`:

```js
import ImageMagick from 'magickwand.js';
import { fileURLToPath } from 'url';
import * as path from 'path';
const { Magick } = await ImageMagick;

// The famous ImageMagick wizard
const wizard = path.join(path.dirname(fileURLToPath(import.meta.url)),
  'node_modules', 'magickwand.js', 'test', 'data', 'wizard.png');

// Read a new image (synchronously)
let im = new Magick.Image(wizard);
console.log(`${wizard}: ${im.size()}`);

// Read a new image (asynchronously)
im = new Magick.Image;
await im.readAsync(wizard);
console.log(`${wizard}: ${await im.sizeAsync()}`);

// Convert it to PNG
await im.magickAsync('PNG');

// Rescale and rotate it
await im.scaleAsync('160x212');
await im.rotateAsync(60);

// Extract the RGBA data
// Conversion to Uint16 is automatic (it recognizes the type of the array)
const pixels = new Uint16Array(im.size().width() * im.size().height() * 4);
await im.writeAsync(0, 0, im.size().width(), im.size().height(), 'RGBA', pixels);
```

### In a `webpack` bundle

To see run the web browser example:

```shell
npm run example:browser
```

Then open `http://localhost:8030`.

There is also an online demo at [https://magickwand.momtchev.com/](https://magickwand.momtchev.com/).

You can run it locally with:

```shell
npm run demo:start
```

### Documentation

Your best source of further information is the Magick++ documentation itself:
* The tutorial: https://imagemagick.org/Magick++/tutorial/Magick++_tutorial.pdf
* The full API: https://www.imagemagick.org/Magick++/Documentation.html

`magickwand.js` implements the full Magick++ C++ API which is object-oriented and translates nicely to JavaScript and TypeScript.

(*only the `Pixels` and `PixelData` classes are not implemented in JavaScript - use `Image.pixelColor` to get individual pixels or write the image to a `TypedArray` with `RGB`/`RGBA`/`CMYK` encoding to get a large region*).

The older, lower level, plain C API - `MagickCore` - is only partially implemented. All the `enum`s required for using `Magick++` are exposed and some image manipulation methods are also implemented. There are two custom constructors that can convert between `Magick.Image` and `MagickCore.Image`.

Unless you are interested in ImageMagick or SWIG internals, you should stick to using Magick++.

Also, if you have a code editor capable of reading the TypeScript bindings, such as Visual Studio Code, it will provide online help for each method.

When in doubt about the JS semantics of a particular method, you can also check the unit tests: https://github.com/mmomtchev/magickwand.js/tree/main/test.

When using Node.js with X-Windows (Linux or Mac), it is possible to build the module with X11 support, in this case the `Image.display()` function will work and it will provide an excellent debugging tool. The default prebuilt binaries do not have this option at the moment in order to support headless installation. Use `--enable-display` to build the native module with it.

### Rebuilding from npm with the built-in ImageMagick library

Starting with version 2.0, `magickwand.js` uses the new `hadron` build system specifically developed for dual-environment (browser WASM and native Node.js) Node-API projects.

```shell
npm install magickwand.js --build-from-source
```

*If you suspect something is now working as it should be, you can add `--verbose --foreground-scripts` to any `npm install` command in order to get verbose output*

This will also rebuild the included Magick++ library. Currently, you will need a working C++17 environment. You can read below for the experimental build with an integrated cross-platform compiler in a `xPack` (basically, an `npm` package). The project is tested, and has pre-built binaries, with `gcc` on Linux x64, `clang` on macOS x64 and arm64, and `MSVC` on Windows x64.

This will rebuild the bindings against the available system-installed (usually shared) libraries which will lead to an order of magnitude smaller addon size. If the X11 libraries are available, this build will support X11 (`Image.display` method) on Linux and macOS.

If you want to rebuild the bindings using the full set of statically linked libraries obtained from `conan`, you have to use:

```shell
npm install magickwand.js --build-from-source --enable-conan
```

Otherwise, you will build ImageMagick against your own system-installed libraries.

Options can also be specified in `.npmrc` so that the default `npm install` rebuilds from source:

```ini
magickwand.js:build_from_source = true
magickwand.js:build_wasm_from_source = false
magickwand.js:disable_fonts = true
magickwand.js:disable_png = true
magickwand.js:disable_jpeg = false
```

### Experimental `xPack` fully self-contained build

This project supports the new `xPack` fully self-contained build of [`hadron`](https://github.com/mmomtchev/hadron) - which means that it can rebuild itself without a working C++ environment. This build is currently highly experimental and is included mostly for demonstration purposes. In this mode, the only requirement is Node.js and `npm` and the project is built using a `clang` `xPack` on all platforms. This build is enabled by the `--enable-standalone-build` option:

```shell
npm install magickwand.js --build-from-source --enable-conan --enable-standalone-build
```

Be sure to read the notes at [Building hadron-based projects without a system compiler](https://github.com/mmomtchev/magickwand.js/blob/main/README.xPacks.md).

### Rebuilding from git (developer mode)

* In order to regenerate the C++ wrapping code, you will need SWIG JavaScript Evolution 5.0.10 - available as a xPack [`@mmomtchev/swig-xpack`](https://github.com/mmomtchev/swig-xpack)
* The SWIG-generated wrappers for the included ImageMagick distribution are included in the published `npm` packages

* Recursively clone the repo
```shell
git clone --recursive https://github.com/mmomtchev/magickwand.js
cd magickwand.js
```

* `npm install` should automatically install the dependencies and a pre-built binary if it exists

* then, you can use the following commands:
```shell
# generate the SWIG wrappers and the TypeScript types
npx xpm generate
# configure step, build against system-installed libraries
# available builds are native, native-debug, wasm and wasm-debug
npx xpm run prepare --config native-debug
# build
npx xpm run build --config native-debug
```

Other useful commands:

```shell
# optional step to enable ASAN (run after prepare and before build)
npx xpm run configure --config native-debug -- -Db_sanitize=address
# inspect conan version (and, generally, run conan commands)
npx xpm run conan -- version
# inspect meson version (and, generally, run meson commands)
npx xpm run meson -- -v
# pass npm options (this will recreate the prebuilt binaries build)
npm_config_enable_conan=true npx xpm run prepare --config native-debug
```

### Linking with an external ImageMagick library

Alternatively, you can use an already installed on your system ImageMagick-7 library. In this case you should know that there are two compilation options that can produce four different libraries - enabling/disabling HDRI (*High Dynamic Range Images*) which returns `float` pixels instead of `int` and Q8/Q16 which determines the bit size of the `Quantum`. These only apply to the data used internally by ImageMagick - image files still use whatever is specified. Mismatching those will produce an addon that returns garbage when requesting individual pixels. By default, this addon uses Q16 with HDRI - which is the default setting on Linux. In this case, assuming that you have ImageMagick installed in `/usr/local`, build with:

```shell
npm install --verbose --foreground-scripts=true --build-from-source  \
  --enable-external --enable-shared --enable-regenerate              \
  --cpp-args="`pkg-config --cflags Magick++`"                          \
  --cpp-link-args="`pkg-config --libs Magick++`"
```

In this case, it would be possible to use a non Q16HDRI build or any other specially built ImageMagick-7.

* `npm test` should work at this point

### Rebuilding the WASM version

The WASM version uses [SWIG JSE](https://github.com/mmomtchev/swig) and `emnapi`.

Generally, the prebuilt WASM binaries should work for everyone. To rebuild the WASM version yourself, you should start by building the conan dependencies:

```shell
npm install magickwand.js --build-wasm-from-source --enable-conan
```

Currently, you need to have EMSDK installed and activated in your environment. A future version might get it automatically from `conan`.

`conan` is required when building to WASM because it is unlikely that you will have system-installed WASM-version libraries that ImageMagick will detect and use.

Or to build a minimal version that excludes many optional dependencies:

```shell
npm install --build-wasm-from-source --verbose --foreground-scripts           \
  --disable-fonts --enable-jpeg --enable-png --disable-tiff                   \
  --disable-webp --disable-jpeg2000 --disable-raw --disable-openmedia         \
  --disable-exr --disable-fftw --disable-heif                                 \
  --disable-color --disable-xml --enable-gzip --disable-zip                   \
  --disable-bzip2 --disable-zstd --disable-xz --disable-lzma --disable-simd   \
  --disable-openmp --disable-display --disable-jbig --disable-cairo
```

At the moment this cross-compilation has been tested only on Linux. Rebuilding both the native and WASM module at the same time is supported but currently it is not possible to use different compilation options. This is possible only by manually rebuilding in the `node_modules/magickwand.js` directory using `xpm`.

### All installation / compilation options

The following options are available when using `npm install`:

* `--verbose` and `--foreground-scripts` are generic `npm` options that when used together allow to see the compilation output

* `--build-from-source` rebuilds the Node.js native module even if a precompiled binary is available

* `--build-wasm-from-source` rebuilds the WASM module even if a precompiled binary is available

* `--enable-regenerate` automatically regenerates the SWIG wrappers, needed if you are building against an ImageMagick distribution different from the builtin one

* `--enable-conan` enables to automatically retrieve the dependencies `conan`

* `--enable-shared` builds `ImageMagick` as a shared library and prefers linking against the shared versions of the system libraries, this binary will be smaller and load faster, but it will run only on the system on which it was compiled

* `--enable-standalone-build` will use the bundled C/C++ compiler (`clang` on all platforms in a xPack `npm` package) to build the package, this should work on all platform even without a C/C++ compiler installed - *this option is considered experimental*

* `--enable-external` will build only the JavaScript bindings expecting to link to an already existing ImageMagick installation

* `--cpp-args=` can be used to pass additional arguments when compiling, add `-I` when compiling with an external ImageMagick

* `--cpp-link-args=` can be used to pass additional arguments when linking, add `-L`/`-l` when linking with an external ImageMagick

* `--disable-simd` disables SIMD (always disabled for WASM)

Additionally, the following options control the various ImageMagick submodules. All `--disable-*` options have `--enable-*` counterparts which are enabled by default and `--disable-*-conan` variants which disable only the built-in `conan` delegate - when `conan` is enabled - but leave the support enabled if the corresponding libraries is system-installed. For example `--enable-jpeg --disable-jpeg-conan` will include JPEG support using the system-installed library even if `conan` is enabled, while only `--enable-jpeg` will depend on `--enable-conan` or `--disable-conan`.

* `--disable-fonts` for the font delegate libraries (always disabled for WASM)
* `--disable-jpeg` for `libopenjpeg`
* `--disable-png` for `libpng`
* `--disable-tiff` for `libtiff`
* `--disable-webp` for `libwebp`
* `--disable-jpeg` for `libjpeg-turbo` (will be auto-enabled by `raw`, `tiff` and `jpeg200`)
* `--disable-jpeg2000` for `libopenjp2` and `jasper`
* `--disable-jbig` for `libjbig`
* `--disable-raw` for `libraw`
* `--disable-jxl` for `libjxl` (*this is disabled by default as it is broken at the moment*)
* `--disable-exr` for `OpenEXR`
* `--disable-fftw` for `FFTW3` (*this is disabled by default as it is broken at the moment*)
* `--disable-heif` for `libheif`
* `--disable-color` for  `liblcms2`
* `--disable-xml` for `libxml2` and enables the built-in basic XML support
* `--disable-gzip` for `zlib`
* `--disable-zip` for `libzip`
* `--disable-bzip2` for `libbz2`
* `--disable-zstd` for `libzstd`
* `--disable-lzma` for `liblzma` and `xz-utils`
* `--disable-openmp` for `OpenMP` (supported only on Linux/native and macOS/native)
* `--disable-display` for `X11` (supported only on Linux/native and macOS/native with Quartz), no `conan` variant as it always uses the system libraries
* `--disable-cairo` for `cairo` (always disabled for WASM)

When disabling the built-in static delegates with `--disable-*-conan`, the ImageMagick configure script will still detect the presence of compatible system libraries and will try to use them, producing a custom binary that will need the dynamically loaded versions of those libraries on your system. The system-installed libraries will be detected through the use of the standard `CMake` supplied modules and, when that fails, on Linux and macOS, through `pkg-config`.

If the WASM binary is rebuilt with no additional libraries, its size will be brought down to 1.5MB compressed with brotli. Further reduction is possible by disabling unneeded SWIG wrappers but this requires to manually edit the SWIG source files and to regenerate the C++ files. Producing a version that supports only synchronous mode and does not require COOP/COEP is also possible. I will consider any offer for commercial support of such dedicated light version.

Also note that currently the unit testing suite expects all supported delegates to be included.

## Using this project as a tutorial for creating C++ bindings for Node.js and emscripten/WASM with SWIG Node-API

ImageMagick is the perfect candidate for an automatically generated with SWIG Node.js addon:

![](https://gist.githubusercontent.com/mmomtchev/3ca8f7c96a0a09ef1dd530c8f73dd959/raw/5a54c384c99c336bb2bc71b75cf0109c6b2c69e7/SWIG-positioning.png)

ImageMagick has an absolutely huge number of API methods and objects - the SWIG-generated module totals close to 450k lines of C++ code. However there are relatively few distinct method signatures. The whole SWIG project which brings you this full API to Node.js and the browser, measures a grand total of less than **1000** lines - half of which are comments!!

I have tried to be as verbose as possible throughout the `Magick++.i` file - you should start there. ImageMagick is a very complex C++ project with over 30 years history and it uses (almost) every single SWIG feature. Study the various JS wrappers that expect special arguments (`ArrayBuffer`, `TypedArray`, arrays), remember to check the ImageMagick header file for the original C++ function and you should be able to use its SWIG typemaps as a starting point in your project.

There is also a [medium article about using the new Node-API support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

## Known to be broken at the moment

* The Node.js native module supports `worker_threads` but it cannot be unloaded cleanly and it should be loaded in the main thread, before using it in worker threads, to prevent Node.js from unloading it when a worker quits (*fixing this will require changes in Node.js*)
* Building without HDRI enabled or with a different quantum size than 16 bits is not supported unless you rebuild ImageMagick manually and link with it externally
* If rebuilding when installing from `npm` fails on Windows with the error: `npm ERR! fatal: not a git repository (or any of the parent directories): .git`, see [#21](https://github.com/mmomtchev/magickwand.js/issues/21)
* Fonts do not work in the WASM version and are unlikely to be implemented in the near future as a proper implementation will require a complex interface with the browser font engine
* Using the PNG encoder for large images in the WASM version leads to stack overflows, the native version encoder and the WASM decoder do not have this limitation
* Generally, if you get strange exceptions in the WASM code, the most probable reason is a stack overflow - currently, `emscripten` cannot grow the stack which is limited to 2MB and cannot reliably report stack overflows without incurring a significant performance penalty
* The loader of the WASM version has its Node.js support disabled to improve its `webpack` compatibility - as Node.js has its own native version, there is no need for WASM

# Future plans

This project serves as showcase and testing grounds for SWIG Node-API.

SWIG JSE roadmap:
* a `wasi-wasm32` target in addition to the `emscripten-wasm32` target
* a much slower for async operations but more compatible WASM version that does not require COOP/COEP but uses message passing between web browser threads    
* Regexp support for `%feature` avoiding the need to explicitly list all the async classes
* Provide memory allocation information to the GC - currently the GC will consider each `Image` to be a small object without an associated data structure - when this object is freed, all the memory will be freed - but the GC may be much more reluctant to actually do so, because it considers the object to be too small

`magickwand.js` roadmap:
* SIMD support for the WASM version

# CLI Tool

Starting with version 2.1, a statically compiled `Magick` CLI tool is shipped with the precompield binaries in `./lib/binding/{platform}-{arch}/bin/Magick`, registered as `package.json` `bin`, launch with `npx magick` or simply `magick` if the path is set.

# Security

ImageMagick is a very widely used software. Security vulnerabilities tend to be very well known and are usually fixed very fast.

The current ImageMagick version can be checked in the `MagickLibVersionText` / `MagickLibAddendum` global exported constants.


---
**IMPORTANT**

* Versions of `magickwand.js` up to 0.9.6 including are compiled with a `libwebp` vulnerable to [CVE-2023-4863](https://www.cve.org/CVERecord?id=CVE-2023-4863).

* Prebuilt binaries of `magickwand.js` are **NOT** affected by [CVE-2024-3094](https://nvd.nist.gov/vuln/detail/CVE-2024-3094) since these are linked with xz-utils 5.4.5, the last version before the backdoor.

---

**Special care must be exercised when ImageMagick is used to process images coming from untrusted sources**. Although possible, outright arbitrary code execution by embedded malicious code in an image is extremely rare and there has been only one such case during the last 30 years - the infamous [`ImageTragick`](https://www.cve.org/CVERecord?id=CVE-2016-3714) exploit in 2016. **It did not affect users who had restrictive security policies.**

However DoS attacks are much more common as it is relatively easy to construct an image that will be of relatively small size when compressed, but it will expand to fill all available memory once uncompressed.

**If using ImageMagick in such environment**, it is highly recommended to review the default security policy in `node_modules/magickwand.js/lib/binding/{platform}/ImageMagick/etc/ImageMagick-7/policy.xml` and to eventually replace it with a more restrictive security policy from the examples in `node_modules/magickwand.js/deps/ImageMagick/config/`. Be also sure to check https://imagemagick.org/script/security-policy.php for more information and to follow an appropriate security announcements mailing list. Also, consider re-building ImageMagick yourself in order to support a more limited amount of image file formats, as complexity is always the main risk factor with any software.

Example for loading `websafe` (the most restrictive security policy):
```js
const pathNodeMagick = require.resolve('magickwand.js');
const websafe = fs.readFileSync(path.resolve(pathNodeMagick,
  'deps', 'ImageMagick', 'config', 'policy-websafe.xml'), 'utf8');
Magick.SetSecurityPolicy(websafe);

assert(MagickCore.IsRightsAuthorized(
  MagickCore.SystemPolicyDomain,
  MagickCore.WritePolicyRights, 'file') === false);
```

The current security policy can be dumped to `stdout` by calling `MagickCore.ListPolicyInfo()`. There is also an online tool for analyzing security policies at https://imagemagick-secevaluator.doyensec.com/.

**In all other cases** security should not be of any concern.

# License

Copyright 2023 Momtchil Momtchev <momtchil@momtchev.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

# Disclaimer

`magickwand.js` is not affiliated in any way with ImageMagick LLC.

In particular, the WASM version is an independent and distinct port from [the WASM port of one of the ImageMagick authors](https://www.npmjs.com/package/@imagemagick/magick-wasm).
