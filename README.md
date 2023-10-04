# node-magickwand

[![ISC](https://img.shields.io/github/license/mmomtchev/node-magickwand)](https://github.com/mmomtchev/node-magickwand/blob/main/LICENSE)
[![Test npm package](https://github.com/mmomtchev/node-magickwand/actions/workflows/test-package.yml/badge.svg)](https://github.com/mmomtchev/node-magickwand/actions/workflows/test-package.yml)
[![Node.js CI](https://github.com/mmomtchev/node-magickwand/actions/workflows/test-dev.yml/badge.svg)](https://github.com/mmomtchev/node-magickwand/actions/workflows/test-dev.yml)
[![npm](https://img.shields.io/npm/v/node-magickwand)](https://www.npmjs.com/package/node-magickwand)

This package is a full native port of the ImageMagick-7 C++ library to Node.js using SWIG Node-API.

Unlike all other ImageMagick `npm` packages, it does not use the CLI to interact with the utilities, but offers direct access to the full C++ API. It supports both synchronous and multithreaded asynchronous operations, it is fully integrated with `TypedArray`s and it has full TypeScript support.

It adds many new features and offers a substantial performance boost and usability benefits.

The pre-built binaries are fully self-contained and do not need an existing ImageMagick installation. It is also possible to rebuild the package against a shared ImageMagick-7.

The project is currently to be considered of beta quality, but it is actively developed because of it its special status as SWIG Node-API showcase project.

It is feature-complete and it should be reasonably stable. It is designed to be well-suited for server-side use with an Express.js-like framework. It has been debugged for memory leaks and, and when only asynchronous methods are used, should never block the event loop. See also [Security](#security).

There is also a [medium article about using the new Node-API support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f) in case you are interested in porting another C++ library to Node.js.

## Usage

```
npm install node-magickwand
```

This will install pre-built binaries on Windows x64, Linux x64 and macOS x64. It will try to compile the module on all other platforms.

```js
import { Magick } from 'node-magickwand';
import { fileURLToPath } from 'url';
import * as path from 'path';

// The famous ImageMagick wizard
const wizard = path.join(path.dirname(fileURLToPath(import.meta.url)),
  'node_modules', 'node-magickwand', 'test', 'data', 'wizard.png');

// Read a new image (synchronously)
let im = new Magick.Image(wizard);
console.log(`${wizard}: ${im.size()}`);

// Read a new image (asynchronously)
im = new Magick.Image;
await im.readAsync(wizard);
console.log(`${wizard}: ${await im.sizeAsync()}`);

// Check if PNG support is built-in (it should be)
const infoPNG = new Magick.CoderInfo('PNG');
console.log(`PNG support: ${infoPNG && infoPNG.isReadable()}`);

// Convert it to PNG
await im.magickAsync('PNG');

// Rescale and rotate it
await im.scaleAsync('160x212');
await im.rotateAsync(60);

// Display it and continue execution (requires X11)
im.displayAsync();

// displayAsync locks the previous image object
// until it completes executions
im = new Magick.Image(wizard);

// Make a copy and convert it to 256-color GIF
const im256 = new Magick.Image(im);
await im256.quantizeColorsAsync(256);
await im256.quantizeAsync();
await im256.magickAsync('GIF');
console.log(`Image colors before/after conversion: ${im.totalColors()}/${im256.totalColors()}`);

// Set compression/quality (JPEG/PNG)
im.quality(98);

// Write it to a binary blob and export it to Base64
const blob = new Magick.Blob;
await im.writeAsync(blob);
const b64 = await blob.base64Async();
console.log(`Base64 ${wizard} : ${b64.substring(0, 40)}...`);

// Import from Base64
await blob.base64Async(b64);
await im.readAsync(blob);
console.log(`${blob}`);

// Convert to RGBA (raw) and write it to a TypedArray
await im.magickAsync('RGBA');
// Conversion to Uint16 is automatic (it recognizes the type of the array)
const pixels = new Uint16Array(im.size().width() * im.size().height() * 4);
im.write(0, 0, im.size().width(), im.size().height(), 'RGBA', pixels);
console.log(`Get pixel from ${wizard} 0 : 0 = ${pixels[0]}`);

// Access pixels directly
const px = im.pixelColor(5, 5);
console.log(`${wizard} 5 : 5 = ${px}`
  + ` (RGBA=${px.pixelType() == Magick.Color.RGBAPixel})`
  + ` red=${px.quantumRed()} alpha=${px.quantumAlpha()}`);

// Produce HTML hex color
const rgb = new Magick.ColorRGB(px);
console.log('HTML color: ', '#' + [rgb.red(), rgb.green(), rgb.blue(), rgb.alpha()]
  .map((v) => Math.floor(v * 255).toString(16).padStart(2, '0')).join(''));

// Parse HTML hex color
const cl = new Magick.Color('#7f7f7f');
console.log('Parse from HTML color to IM internal representation: ', cl.toString());

// Apply blur
const im2 = new Magick.Image(im);
await im2.blurAsync(0.5);

// Compositing (overlaying)
const im3 = new Magick.Image(im.size(), new Magick.Color(0, 65535, 0, 32768));
await im2.compositeAsync(im3, '0x0+0+0', IM.MagickCore.MultiplyCompositeOp);

// Crop
im.crop('10x8+5+5');
console.log(`After cropping: ${wizard}: ${im.size()}`);
```

Your best source of further information is the Magick++ documentation itself:
* The tutorial: https://imagemagick.org/Magick++/tutorial/Magick++_tutorial.pdf
* The full API: https://www.imagemagick.org/Magick++/Documentation.html

(only the `Pixels` and `PixelData` classes are not implemented in JavaScript - use `Image.pixelColor` to get individual pixels or write the image to a `TypedArray` with `RGB`/`RGBA`/`CMYK` encoding to get a large region)

Also, if you have a code editor capable of reading the TypeScript bindings, such as Visual Studio Code, it will provide online help for each method.

`node-magickwand` implements the full Magick++ C++ API.

When in doubt about the JS semantics of a particular method, you can also check the unit tests: https://github.com/mmomtchev/node-magickwand/tree/main/test.

The `Image.display()` function works and it is an excellent debugging tool. On macOS, it requires X11.

### Rebuilding from npm with the built-in ImageMagick library

```
npm install node-magickwand --build-from-source
```

You will need a working C++11 environment. On Windows nothing but VS 2022 works at the moment. This will also rebuild the included Magick++ library.

### Rebuilding from git or using an externally provided ImageMagick library

* In order to regenerate the C++ wrapping code, you will need the still unreleased SWIG 4.2.0 with async Node-API and TypeScript support - available exclusively from https://github.com/mmomtchev/swig/tree/mmom - as of 2023-09-14, the basic Node-API has been merged to the main SWIG trunk but the async support is still being worked on
  * Building with the old SWIG Node/V8 interface is not possible - the typemaps are not compatible
  * Alternatively, if you don't want to build a development version of SWIG yourself, you can clone the `generated` branch where all files have been pre-generated - `npm run deps:download` does this automatically after `npm install`

* Recursively clone the repo
```shell
git clone --recursive https://github.com/mmomtchev/node-magickwand
cd node-magickwand
```

* `npm install` should automatically install the dependencies and compile the module unless a pre-built binary can be downloaded

* or, to do everything manually:
```shell
npm install --ignore-scripts
npm run deps:download
npx @mapbox/node-pre-gyp configure   # --debug for debug mode
npx @mapbox/node-pre-gyp build
```

Alternatively, you can use an already installed on your system ImageMagick-7 library. In this case you should know that there are two compilation options that can produce four different libraries - enabling/disabling HDRI (*High Dynamic Range Images*) which returns `float` pixels instead of `int` and Q8/Q16 which determines the bit size of the `Quantum`. These only apply to the data used internally by ImageMagick - images still use whatever is specified. Mismatching those will produce an addon that returns garbage when requesting individual pixels. By default, this addon uses Q16 with HDRI - which is the default setting on Linux. Unless you can regenerate the SWIG wrappers, you will have to use the exact same version that was used when they were regenerated. In this case, assuming that you have ImageMagick installed in `/usr/local`, build with:
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
npm install node-magickwand --build-from-source --shared_imagemagick \
--magicklibs="-lMagick++-7.Q16HDRI -lMagickWand-7.Q16HDRI -lMagickCore-7.Q16HDRI"
```

In this case, it would be possible to use a non Q16HDRI build or any other specially built ImageMagick-7 as long as its version is an exact match.

If you want to use a different ImageMagick-7 version, you will have to regenerate the SWIG wrappers. You will have to have to build yourself SWIG 4.2.0-mmom from https://github.com/mmomtchev/swig/tree/mmom and then run
```
npm run swig
```

* `npm test` should work at this point

## Using this project as a tutorial for creating C++ bindings for Node.js with SWIG

ImageMagick is the perfect candidate for an automatically generated with SWIG Node.js addon:

![](https://gist.githubusercontent.com/mmomtchev/3ca8f7c96a0a09ef1dd530c8f73dd959/raw/5a54c384c99c336bb2bc71b75cf0109c6b2c69e7/SWIG-positioning.png)

ImageMagick has an absolutely huge number of API methods and objects - the SWIG-generated module totals more than 400k lines of C++ code - and this is only covering the `Magick++` API and the enums from the `MagickWand` API. However there are relatively few distinct method signatures. The whole SWIG project which brings you this full API to Node.js, measures a grand total of only **656** lines - half of which are comments!!

I have tried to be as verbose as possible throughout the `Magick++.i` file - you should start there. ImageMagick is a very complex C++ project with over 30 years history and it uses (almost) every single SWIG feature. Study the various JS wrappers that expect special arguments (`Buffer`, `TypedArray`, arrays), remember to check the ImageMagick header file for the original C++ function and you should be able to use its SWIG typemaps as a starting point in your project.

There is also a [medium article about using the new NAPI support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

## Known to be broken at the moment

* Rebuilding when installing requires Node.js >= 18.0 on all platforms
* Additionally, rebuilding when installing on Windows works only with VS 2022
* The debug build on Windows requires manually setting `winbuildtype` and `winbuildid` due to restrictions in `gyp`
* The module supports `worker_threads` but it cannot be unloaded cleanly and it should be loaded in the main thread, before using it in worker threads, to prevent Node.js from unloading it
* Building on Windows without HDRI enabled or with a different quantum size than 16 bits is not supported
* If rebuilding when installing from `npm` fails on Windows with the error: `npm ERR! fatal: not a git repository (or any of the parent directories): .git`, see [#21](https://github.com/mmomtchev/node-magickwand/issues/21)

# Future plans

This project serves as showcase and testing grounds for SWIG/Node-API.

# Security

ImageMagick is a very widely used software. Security vulnerabilities tend to be very well known and are usually fixed very fast.

The current ImageMagick version can be checked in the `MagickLibVersionText` / `MagickLibAddendum` global exported constants.

**Special care must be exercised when ImageMagick is used to process images coming from untrusted sources**. Although possible, outright arbitrary code execution by embedded malicious code in an image is extremely rare and there has been only one such case during the last 30 years - the infamous [`ImageTragick`](https://www.cve.org/CVERecord?id=CVE-2016-3714) exploit in 2016. **It did not affect users who had restrictive security policies.**

However DoS attacks are much more common as it is relatively easy to construct an image that will be of relatively small size when compressed, but it will expand to fill all available memory once uncompressed.

**If using ImageMagick in such environment**, it is highly recommended to review the default security policy in `node_modules/node-magickwand/lib/binding/{platform}/ImageMagick/etc/ImageMagick-7/policy.xml` and to eventually replace it with a more restrictive security policy from the examples in `node_modules/node-magickwand/deps/ImageMagick/config/`. Be also sure to check https://imagemagick.org/script/security-policy.php for more information and to follow an appropriate security announcements mailing list. Also, consider re-building ImageMagick yourself in order to support a more limited amount of image file formats, as complexity is always the main risk factor with any software.

Example for loading `websafe` (the most restrictive security policy):
```js
const pathNodeMagick = require.resolve('node-magickwand');
const websafe = fs.readFileSync(path.resolve(pathNodeMagick, 'deps', 'ImageMagick', 'config', 'policy-websafe.xml'), 'utf8');
Magick.SetSecurityPolicy(websafe);
assert(MagickCore.IsRightsAuthorized(MagickCore.SystemPolicyDomain, MagickCore.WritePolicyRights, 'file') === false);
```

The current security policy can be dumped to stdout by calling `MagickCore.ListPolicyInfo()`. There is also an online tool for analyzing security policies at https://imagemagick-secevaluator.doyensec.com/.



**In all other cases** security should not be of any concern.

# License

Copyright 2023 Momtchil Momtchev <momtchil@momtchev.com>

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

# Disclaimer

`node-magickwand` is not affiliated in any way with ImageMagick LLC.
