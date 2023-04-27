# node-magickwand
## This project serves three purposes:

* Testing grounds for the NAPI support in SWIG
* Provide alternative native bindings for ImageMagick in Node.js
* Indulge in hyper-reality

## Trying for yourself

The project is far from ready, but it could be usable

Only Linux is being worked on at the moment - you are on your own for other OSes

* If you want NAPI, get SWIG with NAPI support from https://github.com/mmomtchev/swig#mmom
  * Otherwise, building with the old Node/V8 interface might be possible
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