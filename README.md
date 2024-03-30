# magickwand.js

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

The default WASM version is also fully self-contained and its size range is from 1.5MB (*minimal, compressed w/ brotli*) to 5MB (*default full build compressed w/ gzip*) depending on the supported image formats.

Both versions support synchronous and asynchronous multi-threaded operations with an identical API and identical TypeScript bindings. WASM requires `SharedArrayBuffer` (read about [COOP / COEP](https://web.dev/articles/coop-coep)). The Node.js native version also support OpenMP multithreading and SIMD instructions.

The project is currently to be considered of beta quality, but it is actively developed and maintained because of it its special status as SWIG Node-API showcase project. It is a testament to SWIG Node-API's capabilities, namely producing a 400k C++ lines multi-threaded and dual-environment project out of 600 lines of SWIG code.

It is feature-complete and it should be reasonably stable. The Node.js native version is designed to be well-suited for server-side use with an Express.js-like framework. It has been debugged for memory leaks and, and when only asynchronous methods are used, it should never block the event loop. See also [Security](#security).

There is also a [medium article about using the new Node-API support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f) in case you are interested in porting another C++ library to Node.js.

## Usage

```shell
npm install magickwand.js
```

This will install pre-built Node.js native binaries on Windows x64, Linux x64 and macOS x64. It will try to compile the module on all other platforms. It will also install the pre-built WASM binaries which are universal.

Refer to the [`example`](https://github.com/mmomtchev/magickwand.js/tree/main/example) directory for more code examples including browser use examples.

Refer to the [`test/integration`](https://github.com/mmomtchev/magickwand.js/tree/main/test/integration) directory for integration examples with various environments including `webpack` and TypeScript.

### Using from Node.js (native module)

```js
import { Magick } from 'magickwand.js';
import { fileURLToPath } from 'url';
import * as path from 'path';

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

### Using in the browser (WASM module)

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

`magickwand.js` implements the full Magick++ C++ API.

(*only the `Pixels` and `PixelData` classes are not implemented in JavaScript - use `Image.pixelColor` to get individual pixels or write the image to a `TypedArray` with `RGB`/`RGBA`/`CMYK` encoding to get a large region*).

Also, if you have a code editor capable of reading the TypeScript bindings, such as Visual Studio Code, it will provide online help for each method.

When in doubt about the JS semantics of a particular method, you can also check the unit tests: https://github.com/mmomtchev/magickwand.js/tree/main/test.

When using Node.js with X-Windows, the `Image.display()` function works and it is an excellent debugging tool.

### Rebuilding from npm with the built-in ImageMagick library

```shell
npm install magickwand.js --build-from-source
```

You will need a working C++11 environment.

On Windows nothing but VS 2022 works at the moment. This will also rebuild the included Magick++ library.

On Linux and macOS it uses `pip3` to install the `conan` module which builds a number of required libraries in `${HOME}/.conan`. After building, you can safely delete this directory if you wish, since `magickwand.js` is statically linked.

### Rebuilding from git or using an externally provided ImageMagick library

* In order to regenerate the C++ wrapping code, you will need SWIG JavaScript Evolution 5.0.0 - available from https://github.com/mmomtchev/swig.git (as of 2024-01-18, the basic Node-API has been merged to the main SWIG trunk, the async support is in review, everything else is available only in SWIG JSE)
* Alternatively, if you don't want to rebuild SWIG JSE yourself, you can clone the `generated` branch where all files have been pre-generated - `npm run deps:download` does this automatically after `npm install`

* Recursively clone the repo
```shell
git clone --recursive https://github.com/mmomtchev/magickwand.js
cd magickwand.js
```

* `npm install` should automatically install the dependencies and compile the module unless a pre-built binary can be downloaded

* or, to do everything manually:
```shell
npm install --ignore-scripts
npm run deps:download
npx @mapbox/node-pre-gyp configure   # --debug for debug mode
npx @mapbox/node-pre-gyp build
```

Alternatively, you can use an already installed on your system ImageMagick-7 library. In this case you should know that there are two compilation options that can produce four different libraries - enabling/disabling HDRI (*High Dynamic Range Images*) which returns `float` pixels instead of `int` and Q8/Q16 which determines the bit size of the `Quantum`. These only apply to the data used internally by ImageMagick - image files still use whatever is specified. Mismatching those will produce an addon that returns garbage when requesting individual pixels. By default, this addon uses Q16 with HDRI - which is the default setting on Linux. **Unless you can regenerate the SWIG wrappers, you will have to use the exact same version (the latest one at the release date) that was used when they were generated**. In this case, assuming that you have ImageMagick installed in `/usr/local`, build with:
```shell
npx @mapbox/node-pre-gyp configure --shared_imagemagick

LDFLAGS=-L/usr/local/lib \
CFLAGS=-I/usr/local/include/ImageMagick-7 \
CXXFLAGS=-I/usr/local/include/ImageMagick-7 \
npx @mapbox/node-pre-gyp build \
--magicklibs="-lMagick++-7.Q16HDRI -lMagickWand-7.Q16HDRI -lMagickCore-7.Q16HDRI"
```

Or when directly installing with rebuilding from `npm`:

```shell
LDFLAGS=-L/usr/local/lib \
CFLAGS=-I/usr/local/include/ImageMagick-7 \
CXXFLAGS=-I/usr/local/include/ImageMagick-7 \
npm install magickwand.js --build-from-source --shared_imagemagick \
--magicklibs="-lMagick++-7.Q16HDRI -lMagickWand-7.Q16HDRI -lMagickCore-7.Q16HDRI"
```

In this case, it would be possible to use a non Q16HDRI build or any other specially built ImageMagick-7 as long as its version is an exact match.

If you want to use a different ImageMagick-7 version, you will have to regenerate the SWIG wrappers. You will have to have to build yourself SWIG 4.2.0-mmom from https://github.com/mmomtchev/swig/tree/mmom and then run
```shell
npm run swig
```

* `npm test` should work at this point

### Rebuilding the WASM version

The WASM version uses [SWIG JSE](https://github.com/mmomtchev/swig) and `emnapi`.

Generally, the prebuilt WASM binaries should work for everyone. Currently, `npm install` is not capable of rebuilding it. To rebuild the WASM version yourself, you should start by building the conan dependencies:

```shell
npm run conan:emscripten
```

Or to build a minimal version that excludes many optional dependencies:

```shell
npm run conan:emscripten --                                               \
  -ofonts=False -ojpeg=True -opng=False -otiff=False                      \
  -owebp=False -ojpeg2000=False -oraw=False -oopenmedia=False             \
  -obrotli=False -oh265=False -oexr=False -offtw=False -oheif=False       \
  -ojbig=True -ocolor=False -oxml=False -ogzip=False -ozip=False            \
  -obzip2=True -ozstd=False -oxz=False -olzma=False -osimd=False          \
  -oopenmp=True -odisplay=False
```

Then launch:
```shell
npm run configure:emscripten
node-pre-gyp build
```

At the moment this cross-compilation has been tested only on Linux.

Keep in mind that if you want to switch between building a native and a WASM version, you should do:

```shell
rm -rf build
cd deps/ImageMagick
make distclean
```

Otherwise, in between `conan`, `gyp` and the ImageMagick's own build, you might run into weird dependency problems.

### Building a *light* version

Building a lighter custom binary which does not include some of the builtin libraries is possible by specifying:

```shell
npm install --build-from-source --verbose \
    --fonts=false --jpeg=false --png=false --tiff=false \
    --webp=false --jpeg2000=false --raw=false --openmedia=false \
    --brotli=false --h265=false --exr=false --fftw=false --heif=false \
    --jbig=false --color=false --xml=false --gzip=false --zip=false \
    --bzip2=false --zstd=false --xz=false --lzma=false --simd=false \
    --openmp=false --display=false
```

This is not supported for the Windows build which is monolithic. It is supported for Linux, macOS and WASM (see above for WASM). It disables the included delegates, but keep in mind that on Linux and macOS, the ImageMagick configure script will still detect the presence of some system libraries (`jpeg`, `bzip2`, `jbig` and `OpenMP`) and will try to use them, producing a binary that will need the dynamically loaded versions of those libraries on your system. This is not a problem with the WASM version as it is very unlikely that you will have system-installed WASM-version libraries that ImageMagick will detect and use.

If the WASM binary is rebuilt with no additional libraries, its size will be brought down to 1.5MB compressed with brotli. Further reduction is possible by disabling unneeded SWIG wrappers but this requires to manually edit the SWIG source files and to regenerate the C++ files. Producing a version that supports only synchronous mode and does not require COOP/COEP is also possible. I will consider any offer for commercial support of such dedicated light version.

## Using this project as a tutorial for creating C++ bindings for Node.js and emscripten/WASM with SWIG Node-API

ImageMagick is the perfect candidate for an automatically generated with SWIG Node.js addon:

![](https://gist.githubusercontent.com/mmomtchev/3ca8f7c96a0a09ef1dd530c8f73dd959/raw/5a54c384c99c336bb2bc71b75cf0109c6b2c69e7/SWIG-positioning.png)

ImageMagick has an absolutely huge number of API methods and objects - the SWIG-generated module totals more than 400k lines of C++ code - and this is only covering the `Magick++` API and the enums from the `MagickWand` API. However there are relatively few distinct method signatures. The whole SWIG project which brings you this full API to Node.js and the browser, measures a grand total of only **656** lines - half of which are comments!!

I have tried to be as verbose as possible throughout the `Magick++.i` file - you should start there. ImageMagick is a very complex C++ project with over 30 years history and it uses (almost) every single SWIG feature. Study the various JS wrappers that expect special arguments (`ArrayBuffer`, `TypedArray`, arrays), remember to check the ImageMagick header file for the original C++ function and you should be able to use its SWIG typemaps as a starting point in your project.

There is also a [medium article about using the new Node-API support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

Current status of SWIG Node-API as of 2023-10-22:
---
| Feature | Status | Documentation |
--- | --- | --- |
| Base Node-API support | ***merged, scheduled for 4.2.0*** | Part of the official SWIG 4.2.0 documentation |
| Asynchronous methods | ***[swig/PR#2654](https://github.com/swig/swig/pull/2654) in review*** | Part of the official SWIG documentation (in [swig/PR#2654](https://github.com/swig/swig/pull/2654)) |
| TypeScript support | [mmomtchev/swig#typescript](https://github.com/mmomtchev/swig/tree/typescript), polishing for PR | Ony the [medium story](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f)
| WASM / `emscripten` / `emnapi` compatibility | [mmomtchev/swig#wasm](https://github.com/mmomtchev/swig/tree/wasm), mostly working | None at all |
| Code Splitting | [mmomtchev/swig#mmom](https://github.com/mmomtchev/swig/tree/mmom), Proof of Concept | None at all |

SWIG checked out from https://github.com/mmomtchev/swig/tree/mmom is the only version that can generate this project. Besides the above features, it contains several additional small patches some which are still under discussion - such as applying `%feature` to a class.

## Known to be broken at the moment

* Regenerating the SWIG bindings is possible only with my own unpublished SWIG checked out from Github
* Rebuilding when installing requires Node.js >= 18.0 on all platforms
* Additionally, rebuilding when installing on Windows works only with VS 2022
* The debug build on Windows requires manually setting `winbuildtype` and `winbuildid` due to restrictions in `gyp`
* The Node.js native module supports `worker_threads` but it cannot be unloaded cleanly and it should be loaded in the main thread, before using it in worker threads, to prevent Node.js from unloading it when a worker quits (*fixing this will require changes in Node.js*)
* Building on Windows without HDRI enabled or with a different quantum size than 16 bits is not supported
* If rebuilding when installing from `npm` fails on Windows with the error: `npm ERR! fatal: not a git repository (or any of the parent directories): .git`, see [#21](https://github.com/mmomtchev/magickwand.js/issues/21)
* Fonts do not work in the WASM version and are unlikely to be implemented in the near future as a proper implementation will require a complex interface with the browser font engine
* Using the PNG encoder for large images in the WASM version leads to stack overflows, the native version encoder and the WASM decoder work fine
* Generally, if you get strange exceptions in the WASM code, the most probable reason is a stack overflow - currently, `emscripten` cannot grow the stack which is limited to 2MB and cannot reliably report stack overflows without incurring a significant performance penalty
* The loader of the WASM version has its Node.js support disabled to improve its `webpack` compatibility - as Node.js has its own native version, there is no need for WASM

# Future plans

This project serves as showcase and testing grounds for SWIG Node-API.

SWIG Node-API roadmap:
* a `wasi-wasm32` target in addition to the `emscripten-wasm32` target
* a much slower for async operations but more compatible WASM version that does not require COOP/COEP but uses message passing between web browser threads
* Direct implicit casting of objects, avoiding the special handling of `Geometry` and `Color`
* Automatic transparent handling of `ArrayBuffer`s in a way that hides any differences between the Node.js native and the browser WASM environment
* Improved STL containers support avoiding the need for special handling of methods that require `std::vector` support
* Regexp support for `%feature` avoiding the need to explicitly list all the async classes
* Provide memory allocation information to the GC

`magickwand.js` roadmap:
* SIMD support for the WASM version
* Allow configuration from the CLI of the included wrappers - allowing to build an ultra-light version that includes support only for the methods selected by the user

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
