# node-magickwand
## This project serves three purposes:

* Testing grounds for the NAPI support in SWIG
* Provide alternative native bindings for ImageMagick in Node.js
* Indulge in hyper-reality

## Trying for yourself

The project is far from ready, but it could be usable

Only Linux and macOS have working builds at the moment, I am still looking for a solution on Windows.

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

Alternatively, you can use an already installed on your system ImageMagick-7 library. In this case you should know that there are two compilation options that can produce four different libraries - enabling/disabling HDRI (*High Dynamic Range Images*) which returns `float` pixels instead of `int` and Q8/Q16 which determines the bit size of the `Quantum`. These only apply to the interface between the user code and ImageMagick - images still use whatever is specified. Mismatching those will produce an addon that returns garbage when requesting individual pixels. By default, this addon uses Q16 with HDRI - which is the default setting on Linux. Unless you can regenerate the SWIG wrappers, you will have to use the very latest ImageMagick version. In this case, assuming that you have ImageMagick installed in `/usr/local`, build with:
```shell
npx @mapbox/node-pre-gyp configure --shared_imagemagick
LDFLAGS=-L/usr/local/lib CFLAGS=-I/usr/local/include/ImageMagick-7 CXXFLAGS=-I/usr/local/include/ImageMagick-7 npx @mapbox/node-pre-gyp build
```

* `npm test` should work at this point

## Using this project to process images in Node.js

Your starting point should be the Magick++ (the C++ API) documentation:
* The tutorial: https://imagemagick.org/Magick++/tutorial/Magick++_tutorial.pdf
* The full API: https://www.imagemagick.org/Magick++/

All C++ methods (except a few unusable ones that expect custom allocators) have a JS wrapper in `Magick`. If you compiled the optional MagickCore support, you will also get (the mostly unusable from JS) plain C API in `MagickCore`. Otherwise, only the `enum`s required for `Magick` will be available:

```js
const { Magick, MagickCore } = require('node-magickwand');
```

There are no TypeScript bindings at the moment - but there might be if/when I add TypeScript support to SWIG (another planned project).

The unit tests are a very good source of examples.

## Using this project as a tutorial for creating C++ bindings for Node.js with SWIG

I have tried to be as verbose as possible throughout the `Magick++.i` file - you should start there. ImageMagick is a very complex C++ project with 30 years history and it probably uses every single feature of SWIG that might be needed in a Node.js addon. Look at the various JS wrappers that expect special arguments (`Buffer`, `TypedArray`, lists), remember to check the ImageMagick header file for the original C++ function and then you can use its SWIG interface as a starting point in your project.
