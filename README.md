# node-magickwand

This package is a port of the ImageMagick-7 C++ library to Node.js using SWIG NAPI.

It is meant both as
* a general-purpose image processing library for Node.js
* and testing grounds for the NAPI support in SWIG

The project should be considered of `alpha` quality.

There is also a [medium article about using the new NAPI support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

## Usage

```
npm install node-magickwand
```

This will install prebuilt binaries on Windows x64, Linux x64 and macOS x64. macOS supposes that you have all the required libraries from Homebrew. For everything else, see the next section below.

```js
const assert = require('assert');
const { Magick, MagickCore } = require('node-magickwand');
const { Image, Geometry } = Magick;

const im = new Image;
im.read(path.join(__dirname, 'data', 'wizard.png'));
assert(im.size().width() === 80);
im.crop(new Geometry(10, 8, 1, 8));
assert(im.size().width() === 10);
im.magick('JPEG');
im.write('cutout.jpg');
```

Your best source of further information is the Magick++ documentation itself:
* The tutorial: https://imagemagick.org/Magick++/tutorial/Magick++_tutorial.pdf
* The full API: https://www.imagemagick.org/Magick++/

When in doubt about the JS semantics of a particular method, you can also check the unit tests: https://github.com/mmomtchev/node-magickwand/tree/main/test

The `Image.display()` function works and it is an excellent debugging tool.

There are no TypeScript bindings at the moment - the sheer size and complexity of the ImageMagick library renders any port prohibitive unless it is fully automated. TypeScript support for SWIG is planned at some later moment.

### Rebuilding from npm with the built-in ImageMagick library

```
npm install node-magickwand --build-from-source
```

You will need a working C++ environment. On Windows nothing but VS 2022 works at the moment. This will also rebuild the included Magick++ library. On Linux and macOS, it will invoke its `configure` script which will auto-detect whatever usable libraries you have installed on your system.

**This is the currently recommended method of installation on Linux until a proper fully-contained build is implemented.**

### Rebuilding from git or using an externally provided ImageMagick library

* In order to regenerate the C++ wrapping code, you will need SWIG 4.2.0-git with NAPI support from https://github.com/mmomtchev/swig#mmom
  * Building with the old Node/V8 interface is not possible - the typemaps are not compatible
  * Alternatively, you can checkout the `generated` branch where all files have been pre-generated - `npm run deps:download` does this

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

I have tried to be as verbose as possible throughout the `Magick++.i` file - you should start there. ImageMagick is a very complex C++ project with 30 years history and it probably uses every single feature of SWIG that might be needed in a Node.js addon. Look at the various JS wrappers that expect special arguments (`Buffer`, `TypedArray`, lists), remember to check the ImageMagick header file for the original C++ function and then you can use its SWIG interface as a starting point in your project.

There is also a [medium article about using the new NAPI support in SWIG](https://mmomtchev.medium.com/effortlessly-porting-a-major-c-library-to-node-js-with-swig-napi-3c1a5c4a233f).

The tutorial, just like everything else, is still a work-in-progress, but like everything else, you may find it usable.

## Known to be broken at the moment

* Rebuilding when installing on Windows works only with VS 2022 + Node.js >= 18.0

## Asynchronous mode

I intend to fully merge the current NAPI support in SWIG before starting the asynchronous mode support.
