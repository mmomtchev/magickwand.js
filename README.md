# node-magickwand

This package is a full native port of the ImageMagick-7 C++ library to Node.js using SWIG NAPI.

Unlike all other ImageMagick `npm` packages, it does not use the CLI to interact with the utilities, but directly uses the C++ API. It supports both synchronous and multithreaded asynchronous operations and it is fully integrated with `TypedArray`s.

It is less mature than the alternatives, but offers a substantial performance boost and usability benefits.

The pre-built binaries are fully self-contained and do not need an existing ImageMagick installation.

It is currently to be considered of beta quality, but it is actively developed because of it its special status as SWIG Node-API showcase project.

It is meant both as a high-performance general-purpose library for image processing in Node.js and as a demonstration of the capabilities of SWIG Node-API.

There is also a [medium article about using the new NAPI support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

## Usage

```
npm install node-magickwand
```

This will install pre-built binaries on Windows x64, Linux x64 and macOS x64. It will try to compile the module on all other platforms.

```js
import IM from 'node-magickwand';
import { fileURLToPath } from 'url';
import * as path from 'path';

const Magick = IM.Magick;

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

// Write it to a binary blob and export it to Base64
const blob = new Magick.Blob;
await im.writeAsync(blob);
const b64 = await blob.base64Async();
console.log(`${wizard} : ${b64.substring(0, 40)}...`);

// Import from Base64
await blob.base64Async(b64);
await im.readAsync(blob);
console.log(`${blob}`);

// Convert to RGBA (raw) and write it to a TypedArray
await im.magickAsync('RGBA');
// Conversion to Uint16 is automatic
const pixels = new Uint16Array(im.size().width() * im.size().height() * 4);
im.write(0, 0, im.size().width(), im.size().height(), 'RGBA', pixels);
console.log(`${wizard} 0 : 0 = ${pixels[0]}`);

// Access pixels directly
const px = im.pixelColor(5, 5);
console.log(`${wizard} 5 : 5 = ${px}`
  + ` (RGBA=${px.pixelType() == Magick.Color.RGBAPixel})`
  + ` red=${px.quantumRed()} alpha=${px.quantumAlpha()}`);

// Apply blur
im.blurAsync(0.5);
```

Your best source of further information is the Magick++ documentation itself:
* The tutorial: https://imagemagick.org/Magick++/tutorial/Magick++_tutorial.pdf
* The full API: https://www.imagemagick.org/Magick++/

`node-magickwand` implements the full Magick++ C++ API.

When in doubt about the JS semantics of a particular method, you can also check the unit tests: https://github.com/mmomtchev/node-magickwand/tree/main/test

The `Image.display()` function works and it is an excellent debugging tool. On macOS, it requires X11.

There are no TypeScript bindings at the moment - the sheer size and complexity of the ImageMagick library renders any port prohibitive unless it is fully automated. TypeScript support for SWIG is planned at some later moment.

### Rebuilding from npm with the built-in ImageMagick library

```
npm install node-magickwand --build-from-source
```

You will need a working C++ environment. On Windows nothing but VS 2022 works at the moment. This will also rebuild the included Magick++ library.

### Rebuilding from git or using an externally provided ImageMagick library

* In order to regenerate the C++ wrapping code, you will need the still unreleased SWIG 4.2.0 with async Node-API support - available exclusively from https://github.com/mmomtchev/swig/tree/async - Node-API has been merged but the async support is still being worked on
  * Building with the old SWIG Node/V8 interface is not possible - the typemaps are not compatible
  * Alternatively, if you don't want to build a development version of SWIG yourself, you can clone the `generated` branch where all files have been pre-generated - `npm run deps:download` does this

* Recursively clone the repo
```shell
git clone --recursive https://github.com/mmomtchev/node-magickwand
cd node-magickwand
```

* `npm install` should automatically install the dependencies and compile the module

* or, to do everything manually:
```shell
npm install --ignore-scripts
npm run deps:download
npx @mapbox/node-pre-gyp configure
npx @mapbox/node-pre-gyp build
```

Alternatively, you can use an already installed on your system ImageMagick-7 library. In this case you should know that there are two compilation options that can produce four different libraries - enabling/disabling HDRI (*High Dynamic Range Images*) which returns `float` pixels instead of `int` and Q8/Q16 which determines the bit size of the `Quantum`. These only apply to the data used internally by ImageMagick - images still use whatever is specified. Mismatching those will produce an addon that returns garbage when requesting individual pixels. By default, this addon uses Q16 with HDRI - which is the default setting on Linux. Unless you can regenerate the SWIG wrappers, you will have to use the very latest ImageMagick version. In this case, assuming that you have ImageMagick installed in `/usr/local`, build with:
```shell
npx @mapbox/node-pre-gyp configure --shared_imagemagick
LDFLAGS=-L/usr/local/lib CFLAGS=-I/usr/local/include/ImageMagick-7 CXXFLAGS=-I/usr/local/include/ImageMagick-7 npx @mapbox/node-pre-gyp build
```

* `npm test` should work at this point

## Using this project as a tutorial for creating C++ bindings for Node.js with SWIG

ImageMagick is the perfect candidate for an automatically generated with SWIG Node.js addon:

![](https://gist.githubusercontent.com/mmomtchev/3ca8f7c96a0a09ef1dd530c8f73dd959/raw/5a54c384c99c336bb2bc71b75cf0109c6b2c69e7/SWIG-positioning.png)

ImageMagick has an absolutely huge number of API methods and objects - the SWIG-generated module totals more than 400k lines of C++ code - and this is only covering the `Magick++` API and the enums from the `MagickWand` API. However there are relatively few method signatures - and the whole SWIG project which brings you this full API to Node.js, measures a grand total of only **462** lines!!

I have tried to be as verbose as possible throughout the `Magick++.i` file - you should start there. ImageMagick is a very complex C++ project with 30 years history and it probably uses every single feature of SWIG that might be needed in a Node.js addon. Look at the various JS wrappers that expect special arguments (`Buffer`, `TypedArray`, lists), remember to check the ImageMagick header file for the original C++ function and then you can use its SWIG interface as a starting point in your project.

There is also a [medium article about using the new NAPI support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

The tutorial, just like the module itself, is still a work-in-progress.

## Known to be broken at the moment

* Rebuilding when installing requires Node.js >= 18.0 on all platforms
* Additionally, rebuilding when installing on Windows works only with VS 2022

# Future plans

This is the current roadmap both for this project and for SWIG-NAPI in general:

* Typescript support
