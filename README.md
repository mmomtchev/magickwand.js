# node-magickwand
## This project serves three purposes:

* Testing grounds for the NAPI support in SWIG
* Provide alternative native bindings for ImageMagick in Node.js
* Indulge in hyper-reality

## Trying for yourself

The project is far from ready, but it could be usable

Only Linux is being worked on at the moment - you are on your own for other OSes

* If you want NAPI, get SWIG with NAPI support from https://github.com/mmomtchev/swig#mmom
  * Building with the old Node/V8 interface is not possible - the typemaps are not compatible
  * Alternatively, you can checkout the `generated` branch where all files have been pre-generated

* Recursively clone the repo
```shell
git clone --recursive https://github.com/mmomtchev/node-magickwand
cd node-magickwand
```

* Build ImageMagick
```shell
cd deps/ImageMagick
./configure --disable-hdri
make -j4
```

Alternatively, you can use an already installed on your system ImageMagick-7 library. In this case you should know that there are two compilation options that can produce four different libraries - enabling/disabling HDRI (*High Dynamic Range Images*) which returns `float` pixels instead of `int` and Q8/Q16 which determines the bit size of the `Quantum`. These only apply to the interface between the user code and ImageMagick - images still use whatever is specified. Mismatching those will produce an addon that returns garbage when requesting individual pixels. By default, this addon uses Q16 without HDRI - which is the default setting on Linux. You can adjust the build mode in `src/magick_config.h` to build with a different ImageMagick.

* Install the npm dependencies, this will also generate the dependencies and run SWIG - which you must have installed
```shell
npm install
```

* Build the Node.js addon
```shell
node-pre-gyp configure && node-pre-gyp build
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
